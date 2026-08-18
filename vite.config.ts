// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static SPA: build-time prerender of the app shell into index.html.
    // Nginx serves dist/client directly with `try_files ... /index.html`.
    // The shell hydrates and renders every route client-side; no Node server needed.
    // outputPath "/index" => shell is written to index.html at the site root
    // (the plugin does outputPath + ".html"; "/" alone would produce ".html").
    spa: {
      enabled: true,
      prerender: {
        enabled: true,
        outputPath: "/index",
        retryCount: 3,
      },
    },
  },
  // Deploy target is a static file server (Nginx), so the nitro server bundle
  // is dead weight. `false` skips it entirely; only dist/client ships.
  nitro: false,
});
