import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import typescript from "@rollup/plugin-typescript";

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript({
      target: "es5",
      rootDir: resolve("packages/"),
      declaration: true,
      declarationDir: resolve("lib"),
      exclude: resolve("node_modules/**"),
      allowSyntheticDefaultImports: true,
    }),
  ],
  build: {
    outDir: "lib",
    cssTarget: "chrome61",
    lib: {
      entry: resolve("packages/index.ts"),
      name: "MyPackages",
      fileName: "my-packages",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "react",
          "react-dom": "react-dom",
        },
      },
    },
  },
});
