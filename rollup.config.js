import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const extensions = [".js", ".ts", ".json"];
const external = [
  "path",
  "fs-extra",
  "http",
  "stream",
  "https",
  "inspector",
  "v8",
];

/** @type {import("rollup").NormalizedInputOptions} */
const config = {
  input: "src/index.ts",
  external,
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
      name: "SvCoreLib",
      sourcemap: true,
    },
    {
      file: "lib/bundles/bundle.umd.min.js",
      format: "umd",
      name: "SvCoreLib",
      plugins: [terser()],
      sourcemap: true,
    }
  ],
  plugins: [
    typescript(),
    nodeResolve({ extensions }),
    babel({
      babelHelpers: "bundled",
      include: ["src/**/*"],
      extensions,
      exclude: "./node_modules/**",
    }),
  ],
};

export default config;
