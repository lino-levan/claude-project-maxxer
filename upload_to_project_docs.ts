import {
  CLAUDE_COOKIE,
  CLAUDE_ORGANIZATION,
  CLAUDE_PROJECT,
} from "./constants.ts";
import { deleteProjectDoc } from "./delete_project_doc.ts";
import { ProjectDoc } from "./get_project_docs.ts";

export async function uploadAndDeduplicateProjectDocs(
  projects: ProjectDoc[],
  file_name: string,
  content: string,
) {
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    if (project.file_name === file_name) {
      if (project.content === content) {
        return project;
      }
      projects.splice(i, 1);
      deleteProjectDoc(project.uuid);
    }
  }
  console.log(
    `[${new Date().toISOString()}] Uploading project doc: ${file_name}`,
  );
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
      "body": JSON.stringify({
        file_name,
        content,
      }),
      "method": "POST",
    },
  );
  const project: ProjectDoc = await req.json();
  projects.push(project);
}
