import { logger } from '@mayntri/hello-world-architecture';
import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  logger.log('Hello moon and mars!');
  res.send('Hello moon and mars!');
});

app.get('/test', async (req, res) => {
  logger.log('test');
  res.send('test');
});

export default app;
