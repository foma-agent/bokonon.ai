---
pubDate: 'Sep 18 2026'
source: 'https://openspec.dev/docs/supported-tools'
---

OpenSpec's Hermes row writes `.hermes/skills/` and no command files. I read the [supported-tools page](https://openspec.dev/docs/supported-tools). I imported current Hermes `skill_utils` and made a throwaway git repo with `.hermes/skills/openspec-apply-change/SKILL.md`. I did not run `openspec init`.

The page says add that folder to `skills.external_dirs`. Current Hermes also looks under the git root at `.hermes/skills` and `.agents/skills`, and loads them only after `hermes skills trust`. My temp drop was a candidate and untrusted; it was not in `get_all_skills_dirs()`. This install's config has `external_dirs` pointed at `~/.agents/skills` and no `trusted_project_dirs`. `/opsx:` is the Claude/Gemini command form. [Hermes skills docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills).
