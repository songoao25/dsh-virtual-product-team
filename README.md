# Product Team Mode

**English** | [**中文**](README.zh-CN.md)

[![License: MIT](https://img.shields.io/github/license/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team/blob/main/LICENSE)
[![Release](https://img.shields.io/github/v/release/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team/releases)
[![CI](https://img.shields.io/github/actions/workflow/status/songoao25/virtual-product-team/ci.yml)](https://github.com/songoao25/virtual-product-team/actions)
[![Last Commit](https://img.shields.io/github/last-commit/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team)
[![Stars](https://img.shields.io/github/stars/songoao25/virtual-product-team)](https://github.com/songoao25/virtual-product-team)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c?logo=dependabot)](https://github.com/songoao25/virtual-product-team/security/dependabot)

Turn DeepSeek Harness into your virtual product development team. Say "I have an idea" and the AI walks you through the full pipeline — Product Manager → Engineer → QA → Release Engineer — from idea to shippable product. You only talk and make decisions. No technical knowledge required.

## What it is

**Product Team Mode** is a conversation mode (agent preset) for DeepSeek Harness (DSH). Inside this mode:

- **You say**: "I have an idea, I want to build XX"
- **The AI automatically starts the pipeline**: it interviews you like a product manager to clarify the idea → writes a requirements document for your review → designs the technical plan → implements it → runs QA and security audit → prepares release materials
- **Each stage finishes with a report to you**; you approve before it moves to the next stage (stage-gate control)

From start to finish, you never write code, never learn the process, and never need to remember technical jargon.

## The six stages

| Stage | What happens | Output |
|---|---|---|
| 1. Vision | Clarify the idea (who / what problem / why) | Product definition |
| 2. Requirements | Turn the definition into concrete requirements | Requirements doc (PRD) |
| 3. Design | Technical plan and task breakdown | Tech design + task list |
| 4. Development | Implement the task list | Code + tests |
| 5. QA & Audit | Feature-by-feature acceptance + security checks | Audit report |
| 6. Release | Prepare distributable artifacts and promo materials | README / install scripts / version / promo copy |

## Installation

Prerequisites: DeepSeek Harness installed (`dsh` available in PATH).

```bash
git clone https://github.com/songoao25/virtual-product-team.git
cd virtual-product-team
./install.sh
```

Then **start a new conversation**, pick **Product Team Mode** in the mode picker, and simply say: "I have an idea…".

> Note: DSH only allows switching modes in a blank conversation, so start a new one first.

## Uninstall

```bash
cd virtual-product-team
./uninstall.sh
```

After uninstalling, new conversations return to the default mode. No leftovers, other modes are untouched.

## FAQ

**Q: Is it a plugin?** A: No, it's a conversation mode (preset). It changes how the AI behaves (becoming your product team); it doesn't change any existing DSH functionality.

**Q: Do I need to know tech?** A: No. The AI makes all technical decisions. You just answer questions and approve.

**Q: Does it affect my existing conversations/modes?** A: No. It's just one additional mode. Standard, Creator, and other modes remain unchanged.

**Q: What are the v1 limitations?** A: Conversation-only, no visual progress panel. The release stage prepares release materials; pushing to GitHub is done by you.

## License

MIT © songoao25
