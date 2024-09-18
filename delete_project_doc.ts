import {
  CLAUDE_COOKIE,
  CLAUDE_ORGANIZATION,
  CLAUDE_PROJECT,
} from "./constants.ts";

export async function deleteProjectDoc(doc: string) {
  const req = await fetch(
    `https://api.claude.ai/api/organizations/${CLAUDE_ORGANIZATION}/projects/${CLAUDE_PROJECT}/docs/${doc}`,
    {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "anthropic-client-sha": "unknown",
        "anthropic-client-version": "unknown",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "cookie": CLAUDE_COOKIE,
        "Referer": "https://claude.ai/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      "body": JSON.stringify({
        docUuid: doc,
      }),
      "method": "DELETE",
    },
  );
  if (!req.ok) {
    throw new Error("Failed to delete project doc");
  }
}
