// import { defineConfig } from 'vite'
// import react, { reactCompilerPreset } from '@vitejs/plugin-react'
// import babel from '@rolldown/plugin-babel'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     babel({ presets: [reactCompilerPreset()] })
//   ],
// })

import path from 'path';

import { defineConfig, loadEnv } from 'vite'
import react from "@vitejs/plugin-react";

export default ({mode}: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const proxy_url = 
    process.env.VITE_DEV_REMOTE === "remote"
    ? process.env.VITE_BACKEND_SERVER
    : 'http://localhost:8888/';
  
    const base = process.env.VITE_BASE_PATH || '/';

    const config = {
      base,
      plugins : [react()],
      resolve: {
        alias : {
          '@': path.resolve(__dirname, 'src'),
        },
      },
      server : {
        port : 3153,
        host : true,
        allowdHosts: ['hector-application.iptime.org'],
        proxy: {
          '/api': {
            target: proxy_url,
            changeOrigin : true,
            secure : false,
            xfwd: true,
          },
        },
      },
    };

    return defineConfig(config);
};