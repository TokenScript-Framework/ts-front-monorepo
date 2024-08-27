import fs from "fs";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["cjs", "esm"],
  minify: true,
  dts: true,
  onSuccess: () => {
    const dest = "dist/";
    const srcs = ["src/assets/"];
    srcs.forEach((src) => {
      if (src.endsWith("/")) {
        fs.cpSync(src, dest + src.split("/").at(-2), { recursive: true });
      } else {
        fs.cpSync(src, dest + src);
      }
    });
    return Promise.resolve();
  },
});
