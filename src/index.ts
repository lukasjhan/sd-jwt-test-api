import { serve } from '@hono/node-server';
import { SDJwtInstance } from '@sd-jwt/core';
import {
  claims,
  disclosureFrame,
  presentationClaim,
  presentationFrame,
  credential,
  presentableKeyList,
} from './datas/claim';
import { endpoints } from './datas/endpoint';
import { Hono } from 'hono';
import isEqual from 'lodash.isequal';
import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';
import { HTTPException } from 'hono/http-exception';
import { KeyPair } from './key';

const app = new Hono();

let sdjwt: undefined | SDJwtInstance<Record<string, unknown>>;

const getSDJwt = async () => {
  if (sdjwt) {
    return sdjwt;
  }

  sdjwt = new SDJwtInstance<Record<string, unknown>>({
    hasher: digest,
    saltGenerator: generateSalt,
    hashAlg: 'sha-256',
    signAlg: ES256.alg,
    signer: await ES256.getSigner(KeyPair.privateKey),
    verifier: await ES256.getVerifier(KeyPair.publicKey),
  });

  return sdjwt;
};

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

app.get('/test/example/:testName', (c) => {
  const testName = c.req.param('testName');

  if (testName === 'not found') {
    throw new HTTPException(404, { message: 'test not found' });
  }

  return c.json({ result: testName });
});

/*
 * 문제1 : claims 와 disclosureFrame 줄테니까 토큰 발급해봐
 */

app.get('/test/issue/p1', (c) => {
  return c.json({
    description: 'Issue a SD-JWT token with given claims and disclosureFrame',
    claims,
    disclosureFrame,
  });
});

// answer : 'eyJhbGciOiJFUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiZGF0YSI6eyJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJzc24iOiIxMjMtNDUtNjc4OSIsIl9zZCI6WyIzbzBmYVlnaGpnSUFEcnlacHh5WjlLMGdXVEt6SXNUamJBZWZ5Z2RtZFZJIiwiRFhueUVxa25oSHdkcmpKbzZ2UWpkVXA5bnI5WGdVVldHeWhJbkxpdktsQSIsInJ3X3BnVmZ0OEJsc3FTQ3Nnczk4OXN6aVNnY0loNzFwRGw1VDI2YzNUNDQiXX0sIl9zZCI6WyJGVUtCdW81WXFSbmY2N0VhZzV5RHAxeVVpb2xCSEZnQmEweGc1MWdKTGI4IiwiaTNubWw0YW9GNFZZZUt6NUdZdnVjeXJ5VDM4TlVxUG00QXZaTzY4eUVNTSIsImtWVU1nX1hGcjBwamdkbTl1cFpUbTgxVkVjaWF5LTJaOWd2Rmo5RkhBWXMiXSwiX3NkX2FsZyI6IlNIQS0yNTYifQ.927feVeSgpUkXqleM6fq1xRNUWsmqFDKjU4sWlT4UUPk3SLKKETCscP7eLbldXBugjQ11H4GKnCxSLPsbRsLDA~WyI5YjQzZTg3MTUzNmZkOTBmIiwiciIsIjEiXQ~WyIwZjVlZDQzNjU0YTBhZGFlIix7Il9zZCI6WyItd3A2cUdCSzVsVExLbTloY2JnenYxT2tUdnZyYnFoVDFBTDlEd3ZPNjVjIl19XQ~WyI4NzIwMTk3NDlhY2Q5NTdlIiwiYyJd~WyIwNGRlYjY0MmI2OWI1ZTAwIiwibGlzdCIsW3siLi4uIjoiTWlaTWNuSUs5bmE2aW9qcTBRZ00xREQxOENRaklGRl83cFFqamNIZ0RlcyJ9LCJiIix7Ii4uLiI6InpsNXd6QllKcDNUTjN4TzFNUlNWbURoTVZIajhQTHZ4cUwxUVBYeks4Vk0ifSx7Ii4uLiI6Imd1djBEZ3ZSSFh1bjN5dFdfWndWQWpHT05kNE40eDVKOHZpVFFlOVJ5RDgifV1d~WyJjMzEyOWJlZTU4NWRiZGU4IiwiaGkiLCJieWUiXQ~WyJmODk4ZWE0MTQwYjRmMjNiIiwiZmlyc3RuYW1lIiwiSm9obiJd~WyIyMzY3YWE1YmIyYjc1MGRlIiwiaWQiLCIxMjM0Il0~WyIzMTEyYTRjNWE1NzI3YWQyIiwiZGF0YTIiLHsiX3NkIjpbIlpKNWFUSi1QeUZKcEMtTmNMUWpnbzFnclFGN0hZYkF0QVY1YlNBbGh0dTQiXX1d~'

app.post('/test/issue/p1', async (c) => {
  const sdjwt = await getSDJwt();
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
  // TODO: verify.
  const isCorrect = isEqual(submittedClaims, claims);

  return c.json({
    result: isCorrect,
  });
});

/*
 * 문제2 : credential,
    presentationFrame 을 줄테니
    present한 토큰 결과값을 반환해.
 */
app.get('/test/present/p1', async (c) => {
  return c.json({
    description: 'verify that the result is correct when you put in presentPrame',
    credential,
    presentationFrame,
  });
});

app.post('/tests/present/p1', async (c) => {
  const sdjwt = await getSDJwt();
  const { answer } = await c.req.json<{ answer: string }>();

  if (!answer) {
    throw new HTTPException(400, { message: 'bad request' });
  }

  if (typeof answer !== 'string') {
    throw new HTTPException(400, {
      message: 'bad request You didnt put an object or JSON type in there, did you? You need to insert a token!',
    });
  }

  const submittedClaims = await sdjwt.getClaims(answer);
  const isCorrect = isEqual(submittedClaims, presentationClaim);
  return c.json({ isCorrect });
});

/*
 * 문제3 :
 */
app.get('/test/issue/p2', async (c) => {
  return c.json({
    description: 'verify JWT headers are compliant with the standard',
    claims,
    disclosureFrame,
  });
});

app.post('/tests/issue/p2', async (c) => {
  const sdjwt = await getSDJwt();
  const { answer } = await c.req.json();

  const header = await sdjwt.decode(answer);
  const isCorrect = header.jwt?.header?.typ === 'sd-jwt';

  return c.json({ isCorrect });
});

/*
 * 문제5 :
 */
app.get('/test/issue/p3', async (c) => {
  return c.json({
    description: 'test that the claims declared to be SD are processed (set) correctly.',
    claims,
    disclosureFrame,
  });
});

app.post('/tests/issue/p3', async (c) => {
  const sdjwt = await getSDJwt();
  try {
    const { answer } = await c.req.json();

    const submittedClaims = await sdjwt.getClaims(answer);
    const isCorrect = isEqual(submittedClaims, claims);

    if (!isCorrect) {
      return c.json({ isCorrect: false });
    }

    const x = await sdjwt.presentableKeys(answer);
    const isCorrectSdClaim = isEqual(x, presentableKeyList);
    return c.json({ isCorrect: isCorrectSdClaim });
  } catch (error) {
    return c.json({ isCorrect: false });
  }
});

serve({
  fetch: app.fetch,
  port,
});
