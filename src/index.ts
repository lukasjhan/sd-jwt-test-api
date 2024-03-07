import { serve } from '@hono/node-server';
import { SDJwtInstance } from '@sd-jwt/core';
import { claims, disclosureFrame, presentationClaim, presentationFrame } from './datas/claim';
import { endpoints } from './datas/endpoint';
import { Hono } from 'hono';
import isEqual from 'lodash.isequal';
import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';
import { HTTPException } from 'hono/http-exception';

const app = new Hono();
const sdjwt = new SDJwtInstance({
  hasher: digest,
});

/**
 * tests data has test names of each cases
 */

const port = 5600;
console.log(`Server is running on port ${port}`);

const tests = {
  issue: ['testa', 'testb'],
  decode: [],
  present: [],
  verify: [],
};

app.get('/test-lists', (c) => {
  return c.json({ result: endpoints });
});

/*
 * 문제1 : claims 와 disclosureFrame 줄테니까 토큰 발급해봐
 */

app.get('/tests/issue/p1', (c) => {
  return c.json({
    description: 'Issue a SD-JWT token with given claims and disclosureFrame',
    claims,
    disclosureFrame,
  });
});

app.post('/tests/issue/p1', async (c) => {
  const { answer } = await c.req.json<{ answer: string }>();

  if (!answer) {
    throw new HTTPException(400, { message: 'bad request' });
  }

  const submittedClaims = await sdjwt.getClaims(answer);
  const isCorrect = isEqual(submittedClaims, claims);

  return c.json({
    result: isCorrect,
  });
});

/*
 * 문제2 : fraim
 */

app.get('/tests/present/p1', async (c) => {
  return c.json({
    description: 'presentPrame을 넣었을 때 제대로 결과값이 나오는지 확인해보세요',
    claims,
    presentationFrame,
  });
});

app.post('/tests/present/p1', async (c) => {
  const { answer } = await c.req.json<{ answer: string }>();

  if (!answer) {
    throw new HTTPException(400, { message: 'bad request' });
  }

  const submittedPresentaion = await sdjwt.getClaims(answer);
  const isCorrect = isEqual(submittedPresentaion, presentationClaim);
  return c.json({ isCorrect });
});

serve({
  fetch: app.fetch,
  port,
});
