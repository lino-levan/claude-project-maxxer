import { walkSync } from "jsr:@std/fs/walk";
import { debounce } from "jsr:@std/async/debounce";
import { getProjectDocs } from "./get_project_docs.ts";
import { uploadAndDeduplicateProjectDocs } from "./upload_to_project_docs.ts";
import { deleteProjectDoc } from "./delete_project_doc.ts";

const watchedDirectories = [
  "routes/",
  "islands/",
  "components/",
  "lib/",
];

const projectDocs = await getProjectDocs();

// Upload all files in the watched directories to the project docs
async function uploadAllFiles() {
  for (const directory of watchedDirectories) {
    const files = walkSync(directory, {
      includeFiles: true,
      includeDirs: false,
      includeSymlinks: false,
      exts: ["ts", "tsx", "js", "jsx", "md", "json"],
    });
    for (const file of files) {
      await uploadAndDeduplicateProjectDocs(
        projectDocs,
        file.path,
        Deno.readTextFileSync(file.path),
      );
    }
  }
  
  // If there are files that were deleted, remove them from the project docs
  for (let i = projectDocs.length - 1; i >= 0; i--) {
    const doc = projectDocs[i];
    try {
      Deno.statSync(doc.file_name);
    }
    catch {
      console.log(
        `[${new Date().toISOString()}] Deleting project doc: ${doc.file_name}`,
      );
      await deleteProjectDoc(doc.uuid);
      projectDocs.splice(i, 1);
    }
  }
}
await uploadAllFiles();

// Listen to file changes in the `routes/`, `islands/`, `components/`, and `lib/` directories
// and upload new files to the project docs
const watcher = Deno.watchFs(watchedDirectories, { recursive: true });

const onChange = debounce(async () => {
  await uploadAllFiles();
}, 1000);

for await (const event of watcher) {
  onChange();
}
