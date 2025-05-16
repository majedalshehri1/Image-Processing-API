import express from 'express';
import { processImage } from '../controllers/image.controller';
import { validateQuery } from '../middleware/validateQuery.middleware';

const router = express.Router();

router.get('/api/images', validateQuery, processImage);

export default router;
