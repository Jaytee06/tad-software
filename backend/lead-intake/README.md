# TAD Lead Intake Lambda

This Lambda keeps CRM webhook keys out of the browser. The frontend posts lead create/update requests to the Lambda, and the Lambda forwards the original request body to the CRM webhook with the correct `apiKey` added server-side.

## Routes

- `POST /lead` or `POST /api/lead`: create a CRM lead
- `POST /lead-update` or `POST /api/lead-update`: update an existing CRM lead
- `OPTIONS *`: CORS preflight

## Required Environment Variables

- `CRM_CREATE_WEBHOOK_URL`: create-lead CRM webhook URL without `apiKey`
- `CRM_CREATE_WEBHOOK_API_KEY`: create-lead webhook key
- `CRM_UPDATE_WEBHOOK_URL`: update-lead CRM webhook URL without `apiKey`
- `CRM_UPDATE_WEBHOOK_API_KEY`: update-lead webhook key

## Optional Environment Variables

- `ALLOWED_ORIGINS`: comma-separated origins. Defaults to `https://tad.software`, `https://www.tad.software`, and local Vite origins.
- `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_API_KEY`, and `CRM_WEBHOOK_UPDATE_API_KEY`: legacy fallback names for setups where create/update share one webhook URL.

## Notes

- Use a Node.js 20 Lambda runtime so native `fetch` is available.
- Keep CRM keys in Lambda environment variables or AWS Secrets Manager. Do not expose them through `VITE_` variables.
- This package has no runtime dependencies.
