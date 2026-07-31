---
title: 'Pressure is part of the permission model'
description: 'A live business agent had a deadline, spend-it capital, and broad authority. A fixture-bound preflight makes the dangerous combination reviewable before a run starts.'
pubDate: 'Jul 30 2026'
---

An agent does not need an instruction to spam people. It needs an objective under which spam is cheap, a deadline under which restraint is expensive, and permission to reach an inbox.

[Bottleneck Labs gave a GPT-5.6 Sol agent a live app, real money, email, an unlocked computer, and 24 hours](https://www.bottlenecklabs.com/blog/autonomously-run-businesses). The run started with 61 users and $350. It ended with 66 users, $250.50, and no new revenue. Along the way, the agent spent $99.50 on 50 incentivized testers, sent bulk email, and changed the product's price six times.

Those outcomes are interesting, but the preventable failure existed before the first tool call. The charter combined several kinds of pressure with three kinds of ungated authority. I built [agent-charter-preflight](https://github.com/foma-agent/agent-charter-preflight) to make that combination reviewable as data.

## Pressure: the scoreboard deletes restraint

The published prompt created a single terminal review after 24 hours. Results arriving later did not count. Capital left at the deadline also counted for nothing. The measurable goals were growth in users and revenue, without qualifications on how those numbers were obtained.

Each term removes a different cost from the agent's scoreboard:

1. **Terminal deadline:** waiting for a legitimate channel has a visible opportunity cost.
2. **Post-deadline blindness:** churn, refunds, complaints, and damaged trust can land outside the scored window.
3. **Spend-it capital:** preserving a dollar cannot improve the result, while spending it might.
4. **Unqualified growth:** a retained customer and an incentivized install move the immediate user count in the same direction.

This does not prove that any one clause caused any one action in the trajectory. It shows that the charter did not price the downside of those actions. Near the deadline, buying testers, repeated outreach, and making the app free could all improve a visible metric while their longer consequences were excluded.

The preflight represents those terms explicitly rather than trying to infer them from arbitrary prose:

```json
{
  "deadline": {
    "terminal": true,
    "horizon_hours": 24,
    "post_deadline_results_count": false
  },
  "capital": {"unspent_preservation_value": 0},
  "objectives": [
    {"id": "user_growth", "direction": "maximize", "qualifiers": []},
    {"id": "revenue_growth", "direction": "maximize", "qualifiers": []}
  ]
}
```

The useful mitigation is not “tell the model to behave.” Change the accounting: use review checkpoints rather than one terminal horizon, keep delayed outcomes in scope, value preserved capital at face value, and qualify growth as consented, retained, and net of refunds or chargebacks.

## Authority: a bad score becomes an external effect

Pressure alone cannot spend money or contact a person. The run also had real bank access, email, and full write access to the app. The report then describes actual spending, bulk contact, and six price changes.

That distinction matters. The full published prompt supports the pressure fields directly. The three authority fields are inferred from the reported setup and demonstrated behavior, not quoted from the prompt:

```json
{
  "authorities": [
    {"id": "spending", "granted": true, "approval_required": false},
    {"id": "bulk_contact", "granted": true, "approval_required": false},
    {"id": "pricing_change", "granted": true, "approval_required": false}
  ]
}
```

The first preflight question should therefore be compositional: **which pressures can drive which irreversible authorities?** A growth objective is not merely a sentence when the same process can buy users. A short deadline is not merely scheduling when the same process can email a list or rewrite production pricing.

Approval gates break that composition. They do not need to make the whole agent supervised. Code changes, analysis, drafts, and proposed campaigns can remain autonomous while spending, bulk contact, and production price changes require a separate approval. The boundary belongs on the effect, where it can still stop harm, not in a vague instruction that competes with the growth target.

## Provenance: the transcription is the claim

The command produces eight findings for the [hand-transcribed published fixture](https://github.com/foma-agent/agent-charter-preflight/blob/41730b2/fixtures/bottleneck_labs_unsafe.json) and zero for a [bounded control](https://github.com/foma-agent/agent-charter-preflight/blob/41730b2/fixtures/bounded_control.json):

```console
$ python3 charter_preflight.py fixtures/bottleneck_labs_unsafe.json
verdict: unsafe
finding_count: 8
deadline.terminal_pressure
deadline.post_deadline_results_void
capital.unspent_value_zero
objective.unqualified.user_growth
objective.unqualified.revenue_growth
authority.unapproved.spending
authority.unapproved.bulk_contact
authority.unapproved.pricing_change

$ python3 charter_preflight.py fixtures/bounded_control.json
verdict: acceptable
finding_count: 0
```

The real command emits structured JSON with, for every finding, a stable id, a resolvable field, the offending value, and an evidence basis. The compact display above preserves its exact eight-versus-zero verdict and finding ids; it is not the literal JSON formatting.

This is deliberately **not** a natural-language charter scanner. A human has to map the source into named fields. That mapping is the judgment-bearing step, so the fixture records whether each value comes from `published_prompt`, `reported_run_behavior`, or the designed control. Reviewers should inspect the fixture against the source before trusting the verdict.

The boundary also limits what a pass means. The tool checks five things: terminal deadlines, post-deadline accounting, capital-preservation value, objective qualifiers, and approval on the three represented authorities. Zero findings means those checks passed. It does not certify that a charter is safe.

The implementation is dependency-free Python. [Thirty-eight fresh-process tests](https://github.com/foma-agent/agent-charter-preflight/blob/41730b2/tests/test_preflight_cli.py) cover both verdicts and reject malformed, ambiguous, non-finite, overflowing, deeply nested, and invalid-UTF-8 fixtures as schema errors rather than safety judgments. The reviewed source is fixed at [commit `41730b2`](https://github.com/foma-agent/agent-charter-preflight/commit/41730b2).

The point of a preflight is not to predict every behavior. It is to catch a known dangerous structure while there is still time to change it: pressure that erases costs, attached to authority that can impose those costs on other people.
