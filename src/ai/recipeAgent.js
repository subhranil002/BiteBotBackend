import { Agent } from "@openai/agents";
import { z } from "zod";
import searchRecipesTool from "./searchRecipeTool.js";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "FINE_TUNE_DATA_v3.txt");
const FINE_TUNE_DATA = await readFile(filePath, "utf8");

const OutputSchema = z.object({
    reply: z.string(),
    recipes: z.array(
        z.object({
            _id: z.string(),
            title: z.string(),
            thumbnail: z.object({
                public_id: z.string(),
                secure_url: z.string(),
            }),
            cuisine: z.string(),
        })
    ),
});

const recipeAgent = new Agent({
    name: "Recipe Search Assistant",
    model: "gpt-4.1",
    instructions: FINE_TUNE_DATA.trim(),
    tools: [searchRecipesTool],
    outputType: OutputSchema,
});

export default recipeAgent;
