// Bundle test for dsh-virtual-product-team
//
// Verifies the "installable as a skill-pack bundle" shape required by the
// DSH plugin featured list (awesome-dsh-plugin): the root package.json must
// declare `dsh.bundle` pointing at an existing patch, and the patch must wire
// the skill-filesystem service to the preset/skills/ directory.
//
// Self-contained: runs on Node 18+ with no external dependencies, so it
// introduces no build step and no toolchain.

import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function loadJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), 'utf8'))
}

const results = []

function record(name, fn) {
  try {
    fn()
    results.push({ name, pass: true })
    console.log(`  PASS  ${name}`)
  } catch (e) {
    results.push({ name, pass: false })
    console.log(`  FAIL  ${name}\n        ${e.message}`)
  }
}

// --- package.json declares dsh.bundle pointing at an existing patch ---
record('package.json has dsh.bundle and named patch exists', () => {
  const pkg = loadJson('package.json')

  assert.equal(pkg.name, 'dsh-virtual-product-team', 'expected exact name')
  assert.ok(pkg.version, 'version must be set')
  assert.equal(pkg.license, 'MIT', 'expected MIT license')

  assert.ok(pkg.dsh && pkg.dsh.bundle, 'dsh.bundle manifest missing')
  const patchRel = pkg.dsh.bundle.patch
  assert.equal(typeof patchRel, 'string', 'dsh.bundle.patch must be a string')
  assert.ok(patchRel.endsWith('.yml'), 'patch should be a yaml file')
  assert.ok(statSync(join(root, patchRel)).isFile(), `patch file missing: ${patchRel}`)
})

// --- cordis.patch.yml is present, well-formed enough, and wires the skills ---
record('cordis.patch.yml valid, providerName unique, roots disabled', () => {
  const yml = readFileSync(join(root, 'cordis.patch.yml'), 'utf8')

  // Minimal structural sanity. We intentionally avoid a shared YAML parser to
  // keep the test dependency-free; the `!!js` tag is not standard YAML anyway.
  assert.ok(yml.trim().length > 0, 'patch file is empty')
  assert.match(yml, /- insert:/, 'expected a top-level `insert` list')

  // Exactly one insert and one provider to keep providerName unique, and
  // includeDefaultRoots explicitly false to scope skills to this pack.
  assert.equal((yml.match(/id:/g) || []).length, 1, 'expected exactly one inserted config id')
  assert.equal((yml.match(/providerName:/g) || []).length, 1, 'providerName must appear exactly once')
  assert.equal((yml.match(/includeDefaultRoots:/g) || []).length, 1, 'includeDefaultRoots must appear exactly once')
  assert.ok(/includeDefaultRoots:\s*false/.test(yml), 'includeDefaultRoots must be false')
  assert.match(yml, /name:\s*'@deepseek-ai\/dsh-skill-filesystem'/, 'alpha.4 skill filesystem package must be mounted')
  assert.match(yml, /providerName:\s*dsh-virtual-product-team/, 'providerName must remain stable')
  assert.ok(yml.includes('preset/skills/'), 'patch must point at preset/skills/')
  assert.match(yml, /new URL\('preset\/skills\/', baseUrl\)/, 'customSkillDirs must resolve relative to baseUrl')
})

// --- preset ships the 8 stage skills plus 2 official authoring skills ---
record('preset/skills exists with 10 alpha.4 skill loading paths', () => {
  const skillsDir = join(root, 'preset', 'skills')
  const entries = readdirSync(skillsDir, { withFileTypes: true })

  const skillFiles = entries.filter(
    (e) => e.isDirectory() && statSync(join(skillsDir, e.name, 'SKILL.md')).isFile(),
  )
  assert.equal(skillFiles.length, 10, `expected 10 skills, found ${skillFiles.length}`)
  console.log(`  (found ${skillFiles.length} skills in preset/skills/)`)
})

record('Cordis authoring guidance uses alpha.4 public slots', () => {
  const skill = readFileSync(
    join(root, 'preset', 'skills', 'cordis-plugin-development', 'SKILL.md'),
    'utf8',
  )
  const removedConversationTailSlot = ['conversation', 'chat', 'turnTail'].join('.')
  const removedAssistantActionsSlot = ['conversation', 'chat', 'assistant-actions'].join('.')
  assert.ok(!skill.includes(removedConversationTailSlot), 'removed chat-tail slot must not be referenced')
  assert.ok(!skill.includes(removedAssistantActionsSlot), 'removed assistant-actions slot must not be referenced')
  assert.match(skill, /current alpha\.4 public slot catalog/, 'guidance must inspect the current slot catalog')
  assert.match(skill, /conversation\.session\.header\.utilities/, 'guidance must name a supported public slot')
})

// --- summary ---
const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} assertions passed`)
if (failed.length > 0) {
  console.error('FAILED: ' + failed.map((f) => f.name).join('; '))
  process.exitCode = 1
}
