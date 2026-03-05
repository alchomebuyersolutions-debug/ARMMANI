import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stratDir = path.resolve(__dirname, "../../strategies");
export async function saveStrategy(filename, content) {
    const safe = path.basename(filename);
    const allowed = [".pine", ".mjs", ".py", ".js", ".ts"];
    if (!allowed.some((ext) => safe.endsWith(ext))) {
        return { isError: true, content: [{ type: "text", text: `Invalid file type. Allowed: ${allowed.join(", ")}` }] };
    }
    try {
        if (!fs.existsSync(stratDir))
            fs.mkdirSync(stratDir, { recursive: true });
        fs.writeFileSync(path.join(stratDir, safe), content, "utf-8");
        return { content: [{ type: "text", text: `Saved strategy: ${safe} (${content.length} chars)` }] };
    }
    catch (error) {
        return { isError: true, content: [{ type: "text", text: "Error saving strategy: " + error.message }] };
    }
}
//# sourceMappingURL=strategy.js.map