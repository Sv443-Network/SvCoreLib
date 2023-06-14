import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "@rollup/plugin-terser";

const extensions = [".js", ".ts" ];

/** @type {import("rollup").NormalizedInputOptions} */
const config = {
  input: "src/index.ts",
  output: [
    {
      file: "lib/bundles/bundle.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "lib/bundles/bundle.esm.min.js",
      format: "esm",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "lib/bundles/bundle.umd.js",
      format: "umd",
      name: "myLibrary",
      sourcemap: true,
    },
    {
      file: "lib/bundles/bundle.umd.min.js",
      format: "umd",
      name: "myLibrary",
      plugins: [terser()],
      sourcemap: true,
    }
  ],
  plugins: [
    resolve({ extensions }),
    babel({
      babelHelpers: "bundled",
      include: ["src/**/*"],
      extensions,
      exclude: "./node_modules/**",
    }),
  ],
};

export default config;