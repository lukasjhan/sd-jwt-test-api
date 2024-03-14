import { serve } from '@hono/node-server';
import { SDJwtInstance } from '@sd-jwt/core';
import { Hono } from 'hono';
import isEqual from 'lodash.isequal';
import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';
import { HTTPException } from 'hono/http-exception';
import { KeyPair } from './key';
import { testcases as issueTestCases } from './cases/issues';
import { testcases as decodeTestCases } from './cases/decodes';
import { testcases as verifyTestCases } from './cases/verifies';
import { testcases as presentTestCases } from './cases/presents';

const app = new Hono();

/**
 * make sdjwt Instance
 */

const decodeNames = Object.keys(decodeTestCases);
const issuedNames = Object.keys(issueTestCases);
const presentedNames = Object.keys(presentTestCases);
const verifyedNames = Object.keys(verifyTestCases);

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
    kbSigner: await ES256.getSigner(KeyPair.privateKey),
    kbSignAlg: ES256.alg,
    kbVerifier: await ES256.getVerifier(KeyPair.publicKey),
  });

  return sdjwt;
};

app.get('/test-lists', (c) => {
  const issueApiList = issuedNames
    .map((name) => `/tests/issue/${name}`)
    .flatMap((path) => [
      { path, method: 'GET' },
      { path, method: 'POST' },
    ]);
  const decodeApiList = decodeNames
    .map((name) => `/tests/decode/${name}`)
    .flatMap((path) => [
      { path, method: 'GET' },
      { path, method: 'POST' },
    ]);
  const presentApiList = presentedNames
    .map((name) => `/tests/present/${name}`)
    .flatMap((path) => [
      { path, method: 'GET' },
      { path, method: 'POST' },
    ]);
  const verifyApiList = verifyedNames
    .map((name) => `/tests/verify/${name}`)
    .flatMap((path) => [
      { path, method: 'GET' },
      { path, method: 'POST' },
    ]);

  return c.json({
    results: {
      apiList: [...issueApiList, ...decodeApiList, ...presentApiList, ...verifyApiList],
    },
  });
});

app.get('/keys', (c) => {
  return c.json({
    results: KeyPair,
  });
});

app.get('/tests/decode/:name', (c) => {
  const description = 'I will give you token, you have to send me a claim!';
  const name = c.req.param('name') as keyof typeof decodeTestCases;
  if (!decodeNames.includes(name)) {
    throw new HTTPException(404, { message: 'test not found' });
  }

  const { credential } = decodeTestCases[name];

  return c.json({
    results: {
      credential,
      description,
    },
  });
});

app.post(`/tests/decode/:name`, async (c) => {
  const name = c.req.param('name') as keyof typeof decodeTestCases;
  if (!decodeNames.includes(name)) {
    throw new HTTPException(404, { message: 'test not found' });
  }

  const { claims } = decodeTestCases[name];

  try {
    const { answer } = await c.req.json();
    const isCorrect = isEqual(answer, claims);
    return c.json({ results: isCorrect });
  } catch (error) {
    return c.json({ results: false });
  }
});

app.get('/tests/present/:name', (c) => {
  const description = 'Ill give you a token and a presentationFrame, so issue the presented token !';
  const name = c.req.param('name') as keyof typeof presentTestCases;

  if (!presentedNames.includes(name)) {
    throw new HTTPException(404, { message: 'test not found' });
  }

  const { credential, presentationFrame, kb } = presentTestCases[name];

  return c.json({ results: { description, credential, presentationFrame, kb } });
});

app.post(`/tests/present/:name`, async (c) => {
  const name = c.req.param('name') as keyof typeof presentTestCases;

  if (!presentedNames.includes(name)) {
    throw new HTTPException(404, { message: 'test not found' });
  }

  try {
    const { claims, kb } = presentTestCases[name];
    const { answer } = await c.req.json(); //get a token
    const sdjwt = await getSDJwt();

    if (!kb) {
      await sdjwt.verify(answer, undefined, false);
      const submittedClaims = await sdjwt.getClaims(answer);
      const isCorrect = isEqual(submittedClaims, claims);
      return c.json({ results: isCorrect });
    }

    // const keyBindPresent = await sdjwt.present(credential, presentationFrame, {
    //   kb: { payload: kb },
    // });
    const { payload } = await sdjwt.verify(answer, undefined, true);
    const isCorrect = isEqual(payload, claims);
    return c.json({ results: isCorrect });
  } catch (error) {
    return c.json({ results: false });
  }
});

app.get('/tests/verify/:name', (c) => {
  const description = 'prove that its the right token or not';
  const name = c.req.param('name') as keyof typeof verifyTestCases;

  if (!verifyedNames.includes(name)) {
    throw new HTTPException(404, { message: 'test not found' });
  }

  const { credential } = verifyTestCases[name];

  return c.json({ results: { description, credential } });
});

app.post(`/tests/verify/:name`, async (c) => {
  const name = c.req.param('name') as keyof typeof verifyTestCases;
  if (!verifyedNames.includes(name)) {
    throw new HTTPException(404, { message: 'test not found' });
  }

  const { result } = verifyTestCases[name];

  try {
    const { answer } = await c.req.json();
    return c.json({ results: answer === result });
  } catch (error) {
    return c.json({ results: false });
  }
});

app.get('/tests/issue/:name', (c) => {
  const description = 'I will give you claim, you have to send me a token!';
  const name = c.req.param('name') as keyof typeof issueTestCases;

  if (!issuedNames.includes(name)) {
    throw new HTTPException(404, { message: 'test not found' });
  }

  // TODO: check type
  const { disclosureFrame, claims } = issueTestCases[name];

  return c.json({ results: { description, claims, disclosureFrame } });
});

app.post(`/tests/issue/:name`, async (c) => {
  const name = c.req.param('name') as keyof typeof issueTestCases;
  if (!issuedNames.includes(name)) {
    throw new HTTPException(404, { message: 'test not found' });
  }

  const sdjwt = await getSDJwt();
  const { claims } = issueTestCases[name];

  try {
    const { answer } = await c.req.json(); //get a token
    await sdjwt.validate(answer);

    const submittedClaims = await sdjwt.getClaims(answer);
    const isCorrect = isEqual(submittedClaims, claims);
    return c.json({ results: isCorrect });
  } catch (error) {
    return c.json({ results: false });
  }
});

const port = 5600;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
