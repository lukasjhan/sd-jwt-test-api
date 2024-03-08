import { serve } from '@hono/node-server';
import { SDJwtInstance } from '@sd-jwt/core';
import { claims, disclosureFrame, presentationClaim, presentationFrame, credential } from './datas/claim';
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

app.get('/test/issue/p1', (c) => {
  return c.json({
    description: 'Issue a SD-JWT token with given claims and disclosureFrame',
    claims,
    disclosureFrame,
  });
});

// answer : 'eyJhbGciOiJFUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiZGF0YSI6eyJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJzc24iOiIxMjMtNDUtNjc4OSIsIl9zZCI6WyIzbzBmYVlnaGpnSUFEcnlacHh5WjlLMGdXVEt6SXNUamJBZWZ5Z2RtZFZJIiwiRFhueUVxa25oSHdkcmpKbzZ2UWpkVXA5bnI5WGdVVldHeWhJbkxpdktsQSIsInJ3X3BnVmZ0OEJsc3FTQ3Nnczk4OXN6aVNnY0loNzFwRGw1VDI2YzNUNDQiXX0sIl9zZCI6WyJGVUtCdW81WXFSbmY2N0VhZzV5RHAxeVVpb2xCSEZnQmEweGc1MWdKTGI4IiwiaTNubWw0YW9GNFZZZUt6NUdZdnVjeXJ5VDM4TlVxUG00QXZaTzY4eUVNTSIsImtWVU1nX1hGcjBwamdkbTl1cFpUbTgxVkVjaWF5LTJaOWd2Rmo5RkhBWXMiXSwiX3NkX2FsZyI6IlNIQS0yNTYifQ.927feVeSgpUkXqleM6fq1xRNUWsmqFDKjU4sWlT4UUPk3SLKKETCscP7eLbldXBugjQ11H4GKnCxSLPsbRsLDA~WyI5YjQzZTg3MTUzNmZkOTBmIiwiciIsIjEiXQ~WyIwZjVlZDQzNjU0YTBhZGFlIix7Il9zZCI6WyItd3A2cUdCSzVsVExLbTloY2JnenYxT2tUdnZyYnFoVDFBTDlEd3ZPNjVjIl19XQ~WyI4NzIwMTk3NDlhY2Q5NTdlIiwiYyJd~WyIwNGRlYjY0MmI2OWI1ZTAwIiwibGlzdCIsW3siLi4uIjoiTWlaTWNuSUs5bmE2aW9qcTBRZ00xREQxOENRaklGRl83cFFqamNIZ0RlcyJ9LCJiIix7Ii4uLiI6InpsNXd6QllKcDNUTjN4TzFNUlNWbURoTVZIajhQTHZ4cUwxUVBYeks4Vk0ifSx7Ii4uLiI6Imd1djBEZ3ZSSFh1bjN5dFdfWndWQWpHT05kNE40eDVKOHZpVFFlOVJ5RDgifV1d~WyJjMzEyOWJlZTU4NWRiZGU4IiwiaGkiLCJieWUiXQ~WyJmODk4ZWE0MTQwYjRmMjNiIiwiZmlyc3RuYW1lIiwiSm9obiJd~WyIyMzY3YWE1YmIyYjc1MGRlIiwiaWQiLCIxMjM0Il0~WyIzMTEyYTRjNWE1NzI3YWQyIiwiZGF0YTIiLHsiX3NkIjpbIlpKNWFUSi1QeUZKcEMtTmNMUWpnbzFnclFGN0hZYkF0QVY1YlNBbGh0dTQiXX1d~'

app.post('/test/issue/p1', async (c) => {
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
    description: 'jwt header type 을 검사한다.',
  });
});

type HeaderType = {
  typ: string;
  alg: string;
};

app.post('/tests/issue/p2', async (c) => {
  const { answer } = await c.req.json<{ answer: { header: HeaderType } }>();

  if (!answer.header) {
    throw new HTTPException(400, {
      message:
        'bad request You didnt put an object or token type in there, did you? You need to insert a object or JSON !',
    });
  }

  const isCorrect = answer.header.typ === 'sd+jwt' ? true : false;
  return c.json({ isCorrect });
});

serve({
  fetch: app.fetch,
  port,
});

// - sd를 하겠다고 선언한 `claim`들이 정상적으로 처리(세팅)가 되었는지 테스트한다.
// - 검증 error가 제대로 나는지 테스트한다.
//     - 표준 기준에 어긋난 `claim` 인지 테스트한다. 예를 들면 표준 기준에서 `header type : kbt jwt`라고 작성하라고 명시했지만 해당 기준에 맞지 않게 작성되지 않았을 때 에러를 뱉는다.
// - 임의로 서명을 변경하여 (조작된 서명을 사용하여) **`validate`** 및 **`verify`** 메서드에서 올바르지 않은 서명으로 처리되는지 확인한다.
// - sd 에 아무 값도 들어가지 않았을때 (disclosure 허용된 것이 없을 때 다른 claim을 숨기려고 하면 에러를 반환해야 한다.
// - present 된 것뿐안 아닌, issue에 대한 값도 추가적으로 테스트한다.
