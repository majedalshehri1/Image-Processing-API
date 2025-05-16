import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const ext = path.extname(filename).toLowerCase().replace('.', '') || 'jpg';
  const nameWithoutExt = path.parse(filename).name;

  const inputPath = path.resolve(`assets/full/${filename}`);
  const outputDir = path.resolve(`assets/thumb`);
  const outputFileName = `${nameWithoutExt}-${width}x${height}.${ext}`;
  const outputPath = path.join(outputDir, outputFileName);

  // Check if the input file exists
  if (fs.existsSync(outputPath)) return outputPath;

  // Check if the thumb directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // process the image
  await sharp(inputPath)
    .resize(width, height)
    .toFormat(ext === 'jpg' ? 'jpeg' : (ext as 'jpeg' | 'png' | 'webp'))
    .toFile(outputPath);

  return outputPath;
};
