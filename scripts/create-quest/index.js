#!/usr/bin/env node
import { parseArgs } from "./args.js";
import { loadConfig } from "./config.js";
import { askMissing } from "./prompts.js";
import { pad2 } from "./naming.js";
import { scaffold } from "./scaffold.js";

(async () => {
    const argv = await parseArgs();
    const repoRoot = argv.root;
    const cfg = await loadConfig(repoRoot);

    const answers = await askMissing({
        argv,
        templates: cfg.templates,
        entries: cfg.entries
    });

    const picked = answers.entry ?? cfg.entries.find(e =>
        e.year === (argv.year ?? new Date().getFullYear()) &&
        e.type === (argv.type ?? "event")
    );

    const year = Number(answers.year ?? argv.year ?? picked?.year ?? new Date().getFullYear());
    const type = String(answers.type ?? argv.type ?? picked?.type ?? "event");
    const title = String(answers.title ?? argv.title ?? picked?.title ?? "Daily Puzzle");
    const template = String(answers.template ?? argv.template);
    const quest = pad2(Number(answers.quest ?? argv.quest));
    const service = String(answers.service ?? argv.service);
    const grid = argv.grid ?? answers.grid;

    console.log("\n=== Plan ===========================");
    console.log("Root:       ", repoRoot);
    console.log("Year:       ", year);
    console.log("Type:       ", type);
    console.log("Title:      ", title);
    console.log("Quest:      ", quest);
    console.log("Template:   ", template);
    console.log("Service:    ", service);
    console.log("Grid Usage: ", grid);
    console.log("===================================\n");

    await scaffold({ repoRoot, year, type, title, quest, template, service, grid });

    console.log("\n✅ Fertig!");
})();
