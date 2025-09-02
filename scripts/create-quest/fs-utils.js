import { promises as fs } from "node:fs";
import path from "node:path";

export async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }
export async function readJson(p) { return JSON.parse(await fs.readFile(p, "utf8")); }

export async function listTemplates(repoRoot) {
    const dir = path.join(repoRoot, "project_templates");
    console.log('dir', dir, await exists(dir));
    if (!(await exists(dir))) return [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(e => e.name);
}

export async function copyDir(src, dest, ignored = []) {
    await fs.cp(src, dest, {
        recursive: true,
        dereference: true,
        filter: (srcPath) => !ignored.some(name => srcPath.includes(name))
    });
}

export async function walk(dir, fileCb) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) await walk(p, fileCb);
        else if (e.isFile()) await fileCb(p);
    }
}

export async function replaceInFile(file, replacements) {
    let txt = await fs.readFile(file, "utf8");
    let changed = false;
    for (const [needle, repl] of replacements) {
        const next = txt.replaceAll(needle, repl);
        if (next !== txt) { changed = true; txt = next; }
    }
    if (changed) await fs.writeFile(file, txt, "utf8");
}

export async function renameFilesContaining(dir, needle, to) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) await renameFilesContaining(p, needle, to);
    }
    for (const e of entries) {
        const from = path.join(dir, e.name);
        const toName = e.name.replaceAll(needle, to);
        if (toName !== e.name) {
            await fs.rename(from, path.join(dir, toName));
        }
    }
}
