import { defineConfig } from "vite";
import vitePluginGlsl from "vite-plugin-glsl";

const config = defineConfig({
    root: "./src",
    plugins: [vitePluginGlsl()],
});

export default config;
