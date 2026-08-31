# Security

- Keep the Content-Security-Policy first-party. No analytics SDKs, no tag managers.
- Public disclosure address is `developer@marcfors.com` via `security.txt`.
- Fail CI on high/critical `npm audit` findings (`--omit=dev --audit-level=high`).
- Do not store visitor PII. Web vitals POST only accepts name/value/id/rating.
