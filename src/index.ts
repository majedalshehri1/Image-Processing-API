import express from 'express';
import dotenv from 'dotenv';
import imageRoutes from './routes/image.routes';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.use(imageRoutes); // Use the image routes

app.get('/', (_req, res) => {
  res.send('Image Processing API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
