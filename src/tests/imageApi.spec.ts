import request from 'supertest';
import express from 'express';
import path from 'path';
import imageRoutes from '../routes/image.routes';

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

// Serve static assets (images)
app.use('/assets', express.static(path.join(__dirname, '../../assets')));

// Register routes
app.use(imageRoutes);

describe('GET /api/images', () => {
  it('✅ should return HTML with embedded image tag for valid query', async () => {
    const res = await request(app)
      .get('/api/images')
      .query({ filename: 'example.jpg', width: 200, height: 200 });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.text).toContain('<img'); // EJS renders an image tag
  });

  it('❌ should return 400 if any query param is missing', async () => {
    const res = await request(app).get('/api/images').query({ width: 200, height: 200 });

    expect(res.status).toBe(400);
    expect(res.text.toLowerCase()).toContain('filename');
  });

  it('❌ should return 400 if width or height is invalid', async () => {
    const res = await request(app)
      .get('/api/images')
      .query({ filename: 'example.jpg', width: -100, height: 0 });

    expect(res.status).toBe(400);
    expect(res.text.toLowerCase()).toContain('positive');
  });
});
