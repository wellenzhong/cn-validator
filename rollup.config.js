import { defineConfig } from "rollup";
export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/cn-validator.js",
    format: "umd",
    sourcemap: true,
    name: "cnValidator",
  },
});