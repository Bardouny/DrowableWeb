import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "orval";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(configDir, "../..");

export default defineConfig({
  drowable: {
    input: {
      target: "http://localhost:5296/openapi/v1.json",
    },
    output: {
      mode: "tags-split",
      target: path.join(projectRoot, "src/api/generated"),
      schemas: path.join(projectRoot, "src/api/generated/models"),
      client: "react-query",
      httpClient: "fetch",
    },
  },
});