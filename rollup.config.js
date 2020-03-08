import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.js",
  output: {
    file: "index.min.js",
    name: "get",
    format: "umd"
  },
  plugins: [nodeResolve({ preferBuiltins: true }), terser()]
};
