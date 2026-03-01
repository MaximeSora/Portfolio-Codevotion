import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import svgr from 'vite-plugin-svgr';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontMatter' }],
        ],
      }),
    },
    svgr(),
    react(),
  ],
  resolve: {
    alias: {
      assets: resolve(__dirname, 'src/assets'),
      components: resolve(__dirname, 'src/components'),
      hooks: resolve(__dirname, 'src/hooks'),
      pages: resolve(__dirname, 'src/pages'),
      posts: resolve(__dirname, 'src/posts'),
      utils: resolve(__dirname, 'src/utils'),
      app: resolve(__dirname, 'src/app'),
      contexts: resolve(__dirname, 'src/contexts'),
    },
  },
  assetsInclude: ['**/*.glb'],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          postprocessing: ['postprocessing'],
        },
      },
    },
  },
});
