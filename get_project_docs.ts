import {
  CLAUDE_COOKIE,
  CLAUDE_ORGANIZATION,
  CLAUDE_PROJECT,
} from "./constants.ts";

export interface ProjectDoc {
  uuid: string;
  file_name: string;
  content: string;
  created_at: string;
  project_uuid: string;
}

export async function getProjectDocs(): Promise<ProjectDoc[]> {
  const req = await fetch(
    `https://api.claude.ai/api/organizations/${CLAUDE_ORGANIZATION}/projects/${CLAUDE_PROJECT}/docs`,
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
      "method": "GET",
    },
  );

  return await req.json();
}
