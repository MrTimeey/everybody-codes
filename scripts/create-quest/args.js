import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "node:path";

export async function parseArgs() {
    const argv = await yargs(hideBin(process.argv))
        .scriptName("create-quest")
        .usage("$0 [quest] [options]")
        .positional("quest",{ type: "string", describe: "Quest (z. B. 4 oder 04)" })
        .option("service",  { type: "string", describe: "Neuer Servicename (ersetzt xService)" })
        .option("grid",  { type: "boolean", describe: "Grid Helper" })
        .option("template", { type: "string", describe: "Template-Ordner (unter Template/…)" })
        .option("root",     { type: "string", describe: "Repo-Root", default: process.cwd() })
        .help().alias("h","help")
        .parse();

    // Normalize
    argv.root = path.resolve(argv.root);
    return argv;
}
