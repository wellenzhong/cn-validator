import { defineConfig } from "rollup";
export default defineConfig({
  input: "src/index.js",
  output: [{
    file: "./dist/cn-validator-cjs.js",
    format: "cjs",
  },{
    file: "./dist/cn-validator-amd.js",
    format: "amd",
  },{
      name:'cnvalidator',
    file: "./dist/cn-validator-umd.js",
    format: "umd",
  },{
    file: "./dist/cn-validator-iife.js",
    format: "iife",
  }],
});