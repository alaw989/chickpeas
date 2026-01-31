import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMG_DIR = './public/img';
const QUALITY = 80;
const MAX_WIDTH = 1920;

// Images that should be converted to WebP (large PNGs and JPGs)
const SKIP_FILES = ['chickpeas.webp', 'plates.avif']; // Already optimized

async function optimizeImages() {
  const files = await readdir(IMG_DIR);

  let totalSavedBytes = 0;

  for (const file of files) {
    if (SKIP_FILES.includes(file)) continue;

    const ext = extname(file).toLowerCase();
    const filePath = join(IMG_DIR, file);
    const stats = await stat(filePath);
    const originalSize = stats.size;

    // Skip small files (under 100KB)
    if (originalSize < 100 * 1024) {
      console.log(`Skipping ${file} (${(originalSize / 1024).toFixed(1)}KB - too small)`);
      continue;
    }

    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const nameWithoutExt = basename(file, ext);
      const webpPath = join(IMG_DIR, `${nameWithoutExt}.webp`);

      try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Resize if width > MAX_WIDTH
        let pipeline = image;
        if (metadata.width > MAX_WIDTH) {
          pipeline = pipeline.resize(MAX_WIDTH);
        }

        // Convert to WebP
        await pipeline
          .webp({ quality: QUALITY })
          .toFile(webpPath);

        const newStats = await stat(webpPath);
        const savedBytes = originalSize - newStats.size;
        totalSavedBytes += savedBytes;

        console.log(`✓ ${file} -> ${nameWithoutExt}.webp`);
        console.log(`  ${(originalSize / 1024).toFixed(1)}KB -> ${(newStats.size / 1024).toFixed(1)}KB (saved ${(savedBytes / 1024).toFixed(1)}KB)`);

        // Remove original file
        await unlink(filePath);
        console.log(`  Removed original: ${file}`);

      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }

  console.log(`\nTotal saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)}MB`);
}

optimizeImages().catch(console.error);
