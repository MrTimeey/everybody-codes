import path from "node:path";
import { promises as fs } from "node:fs";
import { exists, copyDir, walk, replaceInFile, renameFilesContaining } from "./fs-utils.js";
import { safeName } from "./naming.js";
import { runNpmInstall } from "./npm.js";
import {constants} from "./config.js";

export async function scaffold({ repoRoot, year, type, title, quest, template, service, grid }) {
    const templateDir = path.join(repoRoot, "project_templates", template);
    if (!(await exists(templateDir))) throw new Error(`Template nicht gefunden: ${templateDir}`);

    const yearDir = path.join(repoRoot, `${year}_${safeName(title)}`)
    const targetDirName = `${quest}-${template}`;
    const targetDir = path.join(yearDir, targetDirName);

    await fs.mkdir(yearDir, { recursive: true });
    if (await exists(targetDir)) throw new Error(`Ziel existiert bereits: ${targetDir}`);

    console.log(`→ Kopiere ${templateDir} → ${targetDir}`);
    await copyDir(templateDir, targetDir, grid? [] : [constants.GRID_UTILS]);

    const newArtefactName = `${year}_${safeName(title.toLowerCase())}_quest_${quest}`;
    const newDescription = `[${year} ${type}] ${title} - Quest ${quest}`;
    const replacements = [
        [constants.ARTEFACT_OLD, newArtefactName],
        [constants.DESCRIPTION_OLD, newDescription],
        [constants.SERVICE_OLD, service]
    ]
    replacements.forEach(([oldValue, newValue]) => console.log(`→ Ersetze Inhalte: ${oldValue} → ${newValue}`));
    await walk(targetDir, async (file) => {
        const ext = path.extname(file).toLowerCase();
        if (constants.TEXT_EXT.has(ext)) {
            await replaceInFile(file, replacements);
        }
    });

    console.log(`→ Benenne Dateien/Ordner um, die '${constants.SERVICE_OLD}' enthalten`);
    await renameFilesContaining(targetDir, constants.SERVICE_OLD, service);

    console.log("→ npm install läuft …");
    await runNpmInstall(targetDir);

    console.log(`\nNext:\n  cd ${path.relative(process.cwd(), targetDir) || "."}\n  npm run serve`);
}
