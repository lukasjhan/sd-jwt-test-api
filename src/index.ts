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

// answer : 'eyJhbGciOiJFUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiZGF0YSI6eyJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJzc24iOiIxMjMtNDUtNjc4OSIsIl9zZCI6WyIzbzBmYVlnaGpnSUFEcnlacHh5WjlLMGdXVEt6SXNUamJBZWZ5Z2RtZFZJIiwiRFhueUVxa25oSHdkcmpKbzZ2UWpkVXA5bnI5WGdVVldHeWhJbkxpdktsQSIsInJ3X3BnVmZ0OEJsc3FTQ3Nnczk4OXN6aVNnY0loNzFwRGw1VDI2YzNUNDQiXX0sIl9zZCI6WyJGVUtCdW81WXFSbmY2N0VhZzV5RHAxeVVpb2xCSEZnQmEweGc1MWdKTGI4IiwiaTNubWw0YW9GNFZZZUt6NUdZdnVjeXJ5VDM4TlVxUG00QXZaTzY4eUVNTSIsImtWVU1nX1hGcjBwamdkbTl1cFpUbTgxVkVjaWF5LTJaOWd2Rmo5RkhBWXMiXSwiX3NkX2FsZyI6IlNIQS0yNTYifQ.927feVeSgpUkXqleM6fq1xRNUWsmqFDKjU4sWlT4UUPk3SLKKETCscP7eLbldXBugjQ11H4GKnCxSLPsbRsLDA~WyI5YjQzZTg3MTUzNmZkOTBmIiwiciIsIjEiXQ~WyIwZjVlZDQzNjU0YTBhZGFlIix7Il9zZCI6WyItd3A2cUdCSzVsVExLbTloY2JnenYxT2tUdnZyYnFoVDFBTDlEd3ZPNjVjIl19XQ~WyI4NzIwMTk3NDlhY2Q5NTdlIiwiYyJd~WyIwNGRlYjY0MmI2OWI1ZTAwIiwibGlzdCIsW3siLi4uIjoiTWlaTWNuSUs5bmE2aW9qcTBRZ00xREQxOENRaklGRl83cFFqamNIZ0RlcyJ9LCJiIix7Ii4uLiI6InpsNXd6QllKcDNUTjN4TzFNUlNWbURoTVZIajhQTHZ4cUwxUVBYeks4Vk0ifSx7Ii4uLiI6Imd1djBEZ3ZSSFh1bjN5dFdfWndWQWpHT05kNE40eDVKOHZpVFFlOVJ5RDgifV1d~WyJjMzEyOWJlZTU4NWRiZGU4IiwiaGkiLCJieWUiXQ~WyJmODk4ZWE0MTQwYjRmMjNiIiwiZmlyc3RuYW1lIiwiSm9obiJd~WyIyMzY3YWE1YmIyYjc1MGRlIiwiaWQiLCIxMjM0Il0~WyIzMTEyYTRjNWE1NzI3YWQyIiwiZGF0YTIiLHsiX3NkIjpbIlpKNWFUSi1QeUZKcEMtTmNMUWpnbzFnclFGN0hZYkF0QVY1YlNBbGh0dTQiXX1d~'

app.post('/tests/issue/p1', async (c) => {
  const { answer } = await c.req.json<{ answer: string }>();

  if (!answer) {
    throw new HTTPException(400, { message: 'bad request : You cant leave the body value blank.' });
  }

  if (typeof answer !== 'string') {
    throw new HTTPException(400, {
      message: 'bad request You didnt put an object or JSON type in there, did you? You need to insert a token!',
    });
  }

  const submittedClaims = await sdjwt.getClaims(answer);
  console.log(submittedClaims);
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

  const isCorrect = isEqual(answer, presentationClaim);
  return c.json({ isCorrect });
});

serve({
  fetch: app.fetch,
  port,
});
