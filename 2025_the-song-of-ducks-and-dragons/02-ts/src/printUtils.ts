import { PNG } from "pngjs";
import fs from "fs";

export const print = (grid: string[]) => {
    const img = new PNG({ width: grid[0].length, height: grid.length });

    grid.forEach((row, y) => {
        row.split('').forEach((p, x) => {
            const engraved = p === '#';
            const idx = (y * grid[0].length + x) * 4;
            const color = engraved ? 0 : 255;
            img.data[idx] = color;
            img.data[idx + 1] = color;
            img.data[idx + 2] = color;
            img.data[idx + 3] = 255;
        });
    });
    if (!fs.existsSync("./generated")) {
        fs.mkdirSync("./generated")
    }
    img.pack().pipe(fs.createWriteStream(`./generated/engraving_${timestamp()}.png`));
}

const timestamp = (): string => {
    return new Date().toISOString().replace(/[:.-]/g, "_");
}
