# Product Team Mode

**English** | [**中文**](README.zh-CN.md)

[![License: MIT](https://img.shields.io/github/license/songoao25/dsh-virtual-product-team)](https://github.com/songoao25/dsh-virtual-product-team/blob/main/LICENSE)
[![Release](https://img.shields.io/github/v/release/songoao25/dsh-virtual-product-team)](https://github.com/songoao25/dsh-virtual-product-team/releases)
[![CI](https://img.shields.io/github/actions/workflow/status/songoao25/dsh-virtual-product-team/ci.yml)](https://github.com/songoao25/dsh-virtual-product-team/actions)
[![Last Commit](https://img.shields.io/github/last-commit/songoao25/dsh-virtual-product-team)](https://github.com/songoao25/dsh-virtual-product-team)
[![Stars](https://img.shields.io/github/stars/songoao25/dsh-virtual-product-team)](https://github.com/songoao25/dsh-virtual-product-team)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c?logo=dependabot)](https://github.com/songoao25/dsh-virtual-product-team/security/dependabot)

Turn DeepSeek Harness into your virtual product development team. Say "I have an idea" and the AI walks you through the full pipeline — Product Manager → Engineer → QA → Release Engineer — from idea to shippable product. You only talk and make decisions. No technical knowledge required.

## What it is

**Product Team Mode** is a conversation mode (agent preset) for DeepSeek Harness (DSH). Inside this mode:

- **You say**: "I have an idea, I want to build XX"
- **The AI automatically starts the pipeline**: it interviews you like a product manager to clarify the idea → writes a requirements document for your review → designs the technical plan → implements it → runs QA and security audit → prepares release materials
- **Each stage finishes with a report to you**; you approve before it moves to the next stage (stage-gate control)

From start to finish, you never write code, never learn the process, and never need to remember technical jargon.

## The eight stages (all 12 phases covered)

| Stage | What happens | Output |
|---|---|---|
| 1. Idea validation | Research market / competitors / feasibility | Validation conclusion |
| 2. Product definition & requirements | Positioning + concrete requirements with acceptance criteria | Product definition + PRD |
| 3. Technical design | Technical plan and task breakdown | Private tech design + task list |
| 4. Development & quality | Implement + test + security audit | Code + private audit record |
| 5. Release & deploy | Prepare distributable artifacts (GitHub standards) + go live | README / version / Release; private run record |
| 6. Promotion & cold start | Launch kit (video script / article / channels) | Private promo materials, never published with the product |
| 7. Operations & growth | Metrics dashboard, feedback channels, growth actions | Private operating records |
| 8. Iteration & maintenance | Feedback pool, roadmap, then loop to the next round | Private iteration records |

## Installation

Prerequisites: DeepSeek Harness installed (`dsh` available in PATH).

```bash
git clone https://github.com/songoao25/dsh-virtual-product-team.git
cd dsh-virtual-product-team
./install.sh
```

Then **start a new conversation**, pick **Product Team Mode** in the mode picker, and simply say: "I have an idea…".

> Note: DSH only allows switching modes in a blank conversation, so start a new one first.

## Uninstall

```bash
cd dsh-virtual-product-team
./uninstall.sh
```

After uninstalling, new conversations return to the default mode. No leftovers, other modes are untouched.

## Install as a skill pack (optional)

Since v1.2.0 the repo also declares a DSH `bundle`, so you can install it as a **skill pack** on a profile:

```bash
dsh plugin --profile <profile-name> add dsh-virtual-product-team
```

This gives every session of that profile on-demand access to the 8 pipeline skills (idea validation → … → iteration), with no preset.

There are two ways to get the skills — pick whichever fits:

| Method | What you get | Command |
|---|---|---|
| **Full mode (recommended)** | Preset + persona + tools + the 10 skills (8 stage + 2 authoring) | `./install.sh` |
| **Skill pack only** | Just the 8 stage skills, available to any session of a profile | `dsh plugin --profile <p> add dsh-virtual-product-team` |

The two share the same skill content, so you only need one. Full mode is recommended: one install covers everything the mode offers. (The bundle installs only the skill layer — the preset, persona, and tools still come from `./install.sh`.)

## FAQ

**Q: Is it a plugin?** A: It is primarily a conversation mode (preset). Since v1.2.0 it is also shipped as a DSH bundle so the 8 pipeline skills can be installed as a skill pack per profile; this is complementary, the full mode still installs with `./install.sh`.

**Q: Do I need to know tech?** A: No. The AI makes all technical decisions. You just answer questions and approve.

**Q: Does it affect my existing conversations/modes?** A: No. It's just one additional mode. Standard, Creator, and other modes remain unchanged.

**Q: What are the v1 limitations?** A: Conversation-only, no visual progress panel. For GitHub publishing, the release stage asks you which local AI assistant to use and then handles the commit/tag/Release with it.

**Q: Can it develop DSH modes/plugins (like Creator mode)?** A: Yes, since v1.1.0. The mode ships the same self-modification toolset and the two official Cordis authoring skills as Creator mode, so your product team can build new DSH modes and plugins too. That toolset carries shell-level trust and is only used when you explicitly ask for a DSH-specific product.

## License

MIT © songoao25
