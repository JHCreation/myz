import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

const build= process.env.NODE_ENV === 'production'
const noExternal= build ? ['react-easy-sort', 'tslib'] : ['react-easy-sort', 'tslib']
// console.log(noExternal)
export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        // v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  esbuild: {
    // pure: process.env.NODE_ENV === 'production' ? ['console.log'] : [],
    // drop: build ? ['console', 'debugger'] : [],
  },
  ssr: {
    noExternal: []
  },
  
  // server: {
  //   port: 3000
  // },
});

declare global {
  interface Window {
    ENV: any;
    
  }
}