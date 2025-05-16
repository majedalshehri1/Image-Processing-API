import { Request, Response, NextFunction } from 'express';
import { resizeImage } from '../utils/resizeImage';
import path from 'path';

export const processImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filename = req.query.filename as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    if (!filename || Number.isNaN(width) || Number.isNaN(height)) {
      res.status(400).send('⭕️ Must provide filename, width, and height ⭕️');
      return;
    }

    // Resize the image
    await resizeImage(filename, width, height);

    // Prepare the resized image filename and URL
    const ext = path.extname(filename).toLowerCase().replace('.', '');
    const nameWithoutExt = path.parse(filename).name;
    const resizedName = `${nameWithoutExt}-${width}x${height}.${ext}`;

    const image = {
      name: resizedName,
      width,
      height,
      url: `/assets/thumb/${resizedName}`,
    };

    // Render the EJS page with the image
    res.render('index', { image });
  } catch (error) {
    console.error('❌ Error processing image:', error);
    next(error); // Let Express handle the error
  }
};
