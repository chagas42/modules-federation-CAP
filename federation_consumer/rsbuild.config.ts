import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "federation_consumer",
      remotes: {
        federation_provider:
          "federation_provider@http://localhost:3000/mf-manifest.json",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 2000,
  },
});
