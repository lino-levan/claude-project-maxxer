const config = JSON.parse(Deno.readTextFileSync("claude_maxxer.json"));

export const {
  CLAUDE_ORGANIZATION,
  CLAUDE_PROJECT,
  CLAUDE_COOKIE,
} = config;
