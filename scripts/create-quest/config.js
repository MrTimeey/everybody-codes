import path from "node:path";
import { exists, readJson, listTemplates } from "./fs-utils.js";

export const constants = {
    ARTEFACT_OLD: "xx-artefact-xx",
    DESCRIPTION_OLD: "xx-description-xx",
    SERVICE_OLD: "xService",
    TEXT_EXT: new Set([
        ".ts",".tsx",".js",".cjs",".mjs",
        ".json",".md",".txt",".yaml",".yml",
        ".css",".scss"
    ]),
    GRID_UTILS: "gridUtils"
}

export async function loadConfig(repoRoot) {
    const templates = await listTemplates(repoRoot);
    const cfgPath = path.join(repoRoot, "run.config.json");
    let entries = [];
    if (await exists(cfgPath)) {
        const raw = await readJson(cfgPath);
        if (Array.isArray(raw)) {
            entries = raw.map(e => ({
                year: Number(e.year),
                type: String(e.type || "event").toLowerCase(),
                title: String(e.title || "Untitled"),
            })).filter(e => e.year && e.type && e.title);
        } else {
            console.warn("⚠ run.config.json erwartet ein Array von {year,type,title}");
        }
    } else {
        console.warn(`⚠ Keine run.config.json gefunden unter ${cfgPath}`);
    }
    return { templates, entries };
}
