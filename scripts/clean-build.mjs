import { rmSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'build');

if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
  console.log('🧹 Removed build/');
}
