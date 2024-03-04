import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ result: 'hello world!' });
});

app.post('/', async (c) => {
  return c.json({ result: 'hello world!' });
});

const port = 5600;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
