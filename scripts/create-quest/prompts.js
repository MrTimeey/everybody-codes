import inquirer from "inquirer";
import { pad2 } from "./naming.js";

export async function askMissing({ argv, templates, entries }) {
    const qs = [];

    if (!argv.template) {
        qs.push({
            type: "list",
            name: "template",
            message: "Template wählen:",
            choices: templates,
            default: templates.includes("ts") ? "ts" : templates[0],
        });
    }
    if (!argv.grid) {
        qs.push({
            type: "confirm",
            name: "grid",
            message: "Grid Nutzung?",
            default: false,
        });
    }

        qs.push({
            type: "list",
            name: "entry",
            message: "Ziel wählen:",
            choices: entries.map(e => ({
                name: `[${e.year}] ${e.title} (${e.type.toUpperCase()})`,
                value: e
            })),
            default: entries.at(0)
        });
    if (!argv.quest) {
        qs.push({
            type: "input",
            name: "quest",
            message: "Quest:",
            validate: v => /^\d{1,2}$/.test(String(v).trim()) ? true : "Bitte 1–2-stellig (z. B. 4 oder 04).",
            filter: v => pad2(Number(v))
        });
    }

    if (!argv.service) {
        qs.push({
            type: "input",
            name: "service",
            message: "Servicename:",
            default: "xService",
            validate: v => v ? true : "Bitte einen Servicenamen angeben."
        });
    }

    if (qs.length === 0) return {};
    return await inquirer.prompt(qs);
}
