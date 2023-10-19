import * as path from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default function ({ command, mode }: { command: string, mode: string }) {
  console.log(`Executing Vite ${command} in ${mode} mode...`);
  const rollUpConfig: Record<string, any> = {
    input: {},
    output: {}
  };
  return defineConfig({
    plugins: [vue()],
    build: {
      target: 'es2022',
      manifest: true,
      rollupOptions: {...rollUpConfig}
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@e2e', replacement: path.resolve(__dirname, 'e2e') },
      ],
    },
  });
}

