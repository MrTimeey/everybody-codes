import { spawn } from "node:child_process";

export function runNpmInstall(cwd) {
    return new Promise((resolve, reject) => {
        const child = spawn("npm", ["i"], {
            cwd,
            stdio: "inherit",
            shell: process.platform === "win32",
        });
        child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`npm i failed (${code})`))));
        child.on("error", reject);
    });
}
