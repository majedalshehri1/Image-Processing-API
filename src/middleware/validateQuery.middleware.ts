import { Request, Response, NextFunction } from 'express';
// This middleware validates the query parameters for the image processing request
export const validateQuery = (req: Request, res: Response, next: NextFunction): void => {
  const { filename, width, height } = req.query;

  // Check if all required query parameters are present
  if (!filename || !width || !height) {
    res.status(400).send('⭕️ Enter all data: filename, width, and height ⭕️');
    return;
  }

  //convert width and height to numbers
  const widthNum = Number(width);
  const heightNum = Number(height);

  if (Number.isNaN(widthNum) || Number.isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
    res.status(400).send('⭕️ Check if the width and height are positive numbers ⭕️');
    return;
  }

  // Check if the filename has a valid extension
  const validExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const extension = (filename as string).split('.').pop()?.toLowerCase();

  if (!extension || !validExtensions.includes(extension)) {
    res
      .status(400)
      .send('⭕️ Extension not allowed. Allowed extensions are: jpg, jpeg, png, webp ⭕️');
    return;
  }

  next(); // next is called if all validations pass, the next step to check the controller
};
