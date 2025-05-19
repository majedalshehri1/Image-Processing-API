import { resizeImage } from '../utils/resizeImage';
import fs from 'fs';

describe('Image Processing Function', () => {
  const testFile = 'example.jpg';
  const width = 200;
  const height = 200;

  it('should resize the image without throwing an error', async () => {
    const outputPath = await resizeImage(testFile, width, height);
    expect(fs.existsSync(outputPath)).toBeTrue();
  });
});
