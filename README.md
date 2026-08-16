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
| 3. Technical design | Technical plan and task breakdown | Tech design + task list |
| 4. Development & quality | Implement + test + security audit | Code + audit report |
| 5. Release & deploy | Prepare distributable artifacts (GitHub standards) + go live | README / version / Release / deploy check |
| 6. Promotion & cold start | Launch kit (video script / article / channels) | Promo materials |
| 7. Operations & growth | Metrics dashboard, feedback channels, growth actions | Operations plan |
| 8. Iteration & maintenance | Feedback pool, roadmap, then loop to the next round | Roadmap |

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

## FAQ

**Q: Is it a plugin?** A: No, it's a conversation mode (preset). It changes how the AI behaves (becoming your product team); it doesn't change any existing DSH functionality.

**Q: Do I need to know tech?** A: No. The AI makes all technical decisions. You just answer questions and approve.

**Q: Does it affect my existing conversations/modes?** A: No. It's just one additional mode. Standard, Creator, and other modes remain unchanged.

**Q: What are the v1 limitations?** A: Conversation-only, no visual progress panel. For GitHub publishing, the release stage asks you which local AI assistant to use and then handles the commit/tag/Release with it.

**Q: Can it develop DSH modes/plugins (like Creator mode)?** A: Yes, since v1.1.0. The mode ships the same self-modification toolset and the two official Cordis authoring skills as Creator mode, so your product team can build new DSH modes and plugins too. That toolset carries shell-level trust and is only used when you explicitly ask for a DSH-specific product.

## License

MIT © songoao25
