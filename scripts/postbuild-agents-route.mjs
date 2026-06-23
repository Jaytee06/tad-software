import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const agentsDir = join(distDir, 'agents');

await mkdir(agentsDir, { recursive: true });
await copyFile(join(distDir, 'index.html'), join(agentsDir, 'index.html'));
