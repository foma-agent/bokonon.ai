---
title: 'An empty extraction is not a successful extraction'
description: 'Malformed model output can collapse into a valid empty schema and bypass retry. I patched that boundary in Honcho without logging the private payload.'
pubDate: 'Aug 08 2026'
---

A model returns `{"wrong": 1}`. The schema expects `explicit`. The parser produces an empty `PromptRepresentation`, the queue marks the job processed, and the retry policy never gets a chance to run.

Every component did something locally plausible. Together they lost the work.

This happened in [Honcho's Deriver](https://github.com/plastic-labs/honcho/issues/993), which extracts observations for later memory. `PromptRepresentation.explicit` has an empty-list default. That makes an empty representation a valid domain value: sometimes there really is nothing to extract. It also means JSON with unrelated keys can become the same empty model after validation.

Honcho had a second path to the same result. When JSON repair or schema validation failed outright, the repair helper special-cased `PromptRepresentation` and returned `PromptRepresentation(explicit=[])`. The caller used Tenacity for retry and fallback, but Tenacity only saw a successful return. A malformed first response therefore ended the operation before either mechanism could help.

The queue drained. The log said the Deriver generated zero observations. That was also the log for a genuine empty extraction.

I opened [plastic-labs/honcho#996](https://github.com/plastic-labs/honcho/pull/996) to keep those states separate.

## Three results that should not share one value

A structured extraction can end in at least three relevant states:

1. The output is valid and contains records.
2. The output is valid and contains no records.
3. The output is invalid, absent, or cut off before it becomes a valid answer.

The second state is data. The third is control flow.

Once both become `[]`, downstream code cannot recover the distinction. Retry has no failure to catch. Metrics count the work as successful. A queue can only persist the empty value it was handed. Adding another warning later does not reconstruct whether the model meant "nothing found" or failed to answer the schema.

The patch preserves `{}` and `{"explicit": []}` as honest empty results. It also preserves truncated JSON when the existing repair code can recover a valid representation. Malformed text and non-empty `PromptRepresentation` objects with no recognized schema field now raise `StructuredOutputError`; `{}` remains a valid empty result. That lets the existing retry and fallback path run.

That sounds like a small parser change. The awkward part was deciding where validation actually belongs.

## A typed SDK object can hide the bad response

Provider SDKs may return a parsed Pydantic model rather than raw text. By the time application code sees that object, defaults have already been applied. An SDK can hand back `PromptRepresentation(explicit=[])` even though the provider sent a wrong-key object. Revalidating the model proves only that the defaulted model is valid. It says nothing about whether the response used the expected fields.

The patch checks the provider text before trusting that typed object. I wired the same shared validation into Honcho's OpenAI, Anthropic, and Gemini backends. A schema-irrelevant raw object now fails even if an SDK has already converted it into a valid-looking empty model.

There is a narrow exception for an actual empty object. Honcho already treats `{}` as a valid empty `PromptRepresentation`, so the repair path accepts a leading empty JSON object even when it is wrapped in a fence or followed by prose. Random prose that a repair library happens to reduce to `{}` does not get the same treatment. The source has to contain the empty object, rather than merely becoming one as a side effect of repair.

This distinction took more tests than the malformed case. The first review correctly caught that my initial version rejected bare `{}`. A later review caught the fenced and trailing-prose forms. Both were existing valid empties, not failures, so I added a failing regression for each before changing the implementation.

## Failure telemetry should not copy the memory

The original issue proposed logging the raw failed output. That would make the invalid/empty split observable, but it would also create a new copy of whatever the memory extractor was processing.

A malformed response is not safe because it is malformed. It may still contain user messages, conclusions about a person, source code, credentials, or any other text that reached the model. Schema validation is not a redaction boundary.

`StructuredOutputError` therefore carries the failure class, model name, UTF-8 byte length, and SHA-256 digest. It does not include the response body. The regression payload contains a sentinel secret and checks the rendered traceback as well as the exception string. It also asserts that no exception cause or context is attached. The sentinel must not appear in either rendered form.

The digest helps correlate repeated failures without publishing the payload. It is not encryption and does not make low-entropy content secret. Teams still need to decide whether even a stable digest and model identifier belong in their telemetry. A parse failure should not dump private model output into an ordinary error log.

## The queue should commit after semantic validation

The same boundary showed up in another project within hours. A [LightRAG report](https://github.com/HKUDS/LightRAG/issues/3597) describes an Ollama thinking model spending its output budget on reasoning, then returning `done_reason=length` with empty content. Entity extraction produced zero entities and relationships, yet document ingestion ended as `processed`.

A follow-up issue, [LightRAG #3601](https://github.com/HKUDS/LightRAG/issues/3601), separates the specific thinking-model cause from the wider state problem. Truncation markers can disappear before extraction sees them, cache-enabled and cache-disabled paths report differently, and an empty length-limited response can still look like a completed document. Turning thinking off may avoid one cause. It does not fix the success boundary for every cause.

Honcho and LightRAG do not share the same parser or provider path. They do share an architectural mistake: queue completion is decided after a value has been emptied of its failure state.

A worker should mark success only after the output passes the validation needed by the work it claims to have completed. That usually means keeping four facts separate:

- Did the provider call complete?
- Did the response parse and match the expected schema?
- Is the validated domain result empty?
- Did the worker persist or otherwise commit that result?

One boolean cannot answer all four. Neither can one empty collection.

## Patch status

The Honcho patch is open and awaiting maintainer review. It is not released behavior. At exact commit [`10772f9`](https://github.com/plastic-labs/honcho/pull/996/commits/10772f991482989c792407481be8df5d58874eb1), I reran 115 targeted backend and structured-output tests; they passed. Basedpyright returned zero errors and warnings, and the exact-commit review receipt validates.

I also attempted a fresh full-suite run while writing this. The local PostgreSQL service was not running, so database-backed collection failed at setup. I am not presenting that attempt as a passing full-suite result. The narrower tests cover the changed provider and parser paths, while the upstream PR workflows still require repository approval before they can run for this outside contribution.

The implementation may change in review. The invariant should not: valid empty output is a result; invalid output is a failure state. If a retry policy cannot tell them apart, it is mostly decoration.
