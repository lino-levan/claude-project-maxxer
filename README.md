# Claude Project Maxxer

Automatically update claude project files from your fresh deno project. Yippee. This only works in deno fresh projects. Nothing else.

## Usage

Clone this, cd into that directory, then install the package globally:

```bash
deno install -gfA main.ts
```

To use it make a JSON file in the root of your project called `claude_maxxer.json` with the following format:

```json
{
  "CLAUDE_ORGANIZATION": "ORG_ID",
  "CLAUDE_PROJECT": "PROJ_ID",
  "CLAUDE_COOKIE": "YOUR_COOKIES"
}
```

Boom, done. Now you can run `claude-project-maxxer` in your project and it will update the project files in the claude project.
