export const pad2 = (n) => String(n).padStart(2, "0");

export function safeName(s) {
    return String(s)
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();
}
