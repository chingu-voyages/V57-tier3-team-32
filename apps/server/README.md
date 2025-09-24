# API Documentation

## Endpoint Details

### GET Pull Requests
Fetches all pull requests (open, closed, and merged) from a GitHub repository and returns them in a normalized format.

**Endpoint:** `GET /api/v1/pull-requests`

### Query Parameters

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| `owner`   | string | Yes      | GitHub repository owner/organization name |
| `repo`    | string | Yes      | GitHub repository name         |

### Headers
No additional headers required from the client. The API uses a server-side GitHub token for authentication.

### Example Request
```bash
GET /pull-requests?owner=facebook&repo=react
```

### Response Format

#### Success Response (200)
Returns an array of normalized pull request objects.

```json
[
  {
    "prNumber": 123,
    "title": "Fix memory leak in useEffect hook",
    "creator": "johndoe",
    "creationTimestamp": "2024-01-15T10:30:00Z",
    "requestedReviewers": ["janedoe", "reviewerbot"],
    "lastActionType": "open",
    "lastActionTimestamp": "2024-01-16T14:22:00Z"
  },
  {
    "prNumber": 124,
    "title": "Add new component for data visualization",
    "creator": "developer123",
    "creationTimestamp": "2024-01-10T08:15:00Z",
    "requestedReviewers": [],
    "lastActionType": "merged",
    "lastActionTimestamp": "2024-01-14T16:45:00Z"
  }
]
```

#### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `prNumber` | number | Pull request number |
| `title` | string | Pull request title |
| `creator` | string | GitHub username of the PR creator |
| `creationTimestamp` | string | ISO 8601 timestamp when PR was created |
| `requestedReviewers` | string[] | Array of GitHub usernames requested for review |
| `lastActionType` | string | Latest action on the PR (`"open"`, `"closed"`, or `"merged"`) |
| `lastActionTimestamp` | string | ISO 8601 timestamp of the last update |

#### Error Responses

**400 Bad Request** - Missing required parameters
```json
{
  "error": "Missing environment variables."
}
```

**500 Internal Server Error** - API failure or server issues
```json
{
  "error": "Internal server error."
}
```

### Authentication & Configuration

#### Environment Variables Required
- `GITHUB_API_TOKEN`: GitHub personal access token with repository read permissions

#### GitHub Token Permissions
The GitHub token must have the following permissions:
- `repo` scope for private repositories

### Rate Limiting
This endpoint is subject to GitHub API rate limits:
- **Authenticated requests**: 5,000 requests per hour

### Example Usage

#### JavaScript/Node.js
```javascript
const response = await fetch('/pull-requests?owner=microsoft&repo=vscode');
const pullRequests = await response.json();

if (response.ok) {
  console.log(`Found ${pullRequests.length} pull requests`);
  pullRequests.forEach(pr => {
    console.log(`PR #${pr.prNumber}: ${pr.title} by ${pr.creator}`);
  });
} else {
  console.error('Error:', pullRequests.error);
}
```

#### cURL
```bash
curl "https://your-api-domain.com/pull-requests?owner=facebook&repo=react"
```

### Notes
- All pull requests are fetched regardless of state (open, closed, merged)
- The `lastActionType` field will show `"merged"` if the PR was merged, otherwise it reflects the PR state (`"open"` or `"closed"`)
- Timestamps are returned in ISO 8601 format
- The endpoint fetches all pull requests in a single request - for repositories with many PRs, consider implementing pagination

### Error Handling
- Missing query parameters result in a 500 error
- GitHub API failures are caught and return a generic 500 error
- Network timeouts and connection issues will result in 500 errors

### Dependencies
- **axios**: For HTTP requests to GitHub API
- **express**: Web framework for handling requests
- **dotenv**: For environment variable management