import axios from 'axios';
import { SDJwtInstance, SdJwtPayload } from '@sd-jwt/core';
import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';

async function getTestLists(): Promise<Array<{ method: string; path: string }>> {
  const response = await axios.get('http://localhost:5600/test-lists');
  return response.data.results.apiList;
}

async function getKeys() {
  const response = await axios.get('http://localhost:5600/keys');
  return response.data.results;
}

async function getTest(path: string) {
  const response = await axios.get(`http://localhost:5600${path}`);
  return response.data;
}

async function postTest(path: string, answer: any) {
  const response = await axios.post(`http://localhost:5600${path}`, { answer });
  return response.data.results;
}

async function run(sdjwt: SDJwtInstance<SdJwtPayload>, type: string, path: string) {
  switch (type) {
    case 'issue': {
      const problem = await getTest(path);
      const { claims, disclosureFrame } = problem.results;
      const credential = await sdjwt.issue(claims, disclosureFrame);
      const result = await postTest(path, credential);
      console.log(`Test ${type}: [${path}] [${result}]`);
      break;
    }
    case 'present': {
      const problem = await getTest(path);
      const { credential, presentationFrame } = problem.results;
      const present = await sdjwt.present(credential, presentationFrame);
      const result = await postTest(path, present);
      console.log(`Test ${type}: [${path}] [${result}]`);
      break;
    }
    case 'verify': {
      const problem = await getTest(path);
      const { credential } = problem.results;
      const kb = !credential.endsWith('~');
      try {
        await sdjwt.verify(credential, undefined, kb);
        const result = await postTest(path, true);
        console.log(`Test ${type}: [${path}] [${result}]`);
      } catch (e) {
        const result = await postTest(path, false);
        console.log(`Test ${type}: [${path}] [${result}]`);
      }
      break;
    }
    case 'decode': {
      const problem = await getTest(path);
      const { credential } = problem.results;
      const claims = await sdjwt.getClaims(credential);
      const result = await postTest(path, claims);
      console.log(`Test ${type}: [${path}] [${result}]`);
      break;
    }
  }
}

(async () => {
  console.log('Testing Start');

  const testList = await getTestLists();
  const { publicKey, privateKey } = await getKeys();

  const sdjwt = new SDJwtInstance({
    hasher: digest,
    hashAlg: 'sha-256',
    saltGenerator: generateSalt,
    signAlg: ES256.alg,
    signer: await ES256.getSigner(privateKey),
    verifier: await ES256.getVerifier(publicKey),
    kbSignAlg: ES256.alg,
    kbSigner: await ES256.getSigner(privateKey),
    kbVerifier: await ES256.getVerifier(publicKey),
  });

  const tests = testList
    .filter((test) => test.method === 'GET')
    .map((test) => {
      if (test.path.includes('issue')) {
        return { path: test.path, type: 'issue' };
      }
      if (test.path.includes('verify')) {
        return { path: test.path, type: 'verify' };
      }
      if (test.path.includes('decode')) {
        return { path: test.path, type: 'decode' };
      }
      if (test.path.includes('present')) {
        return { path: test.path, type: 'present' };
      }
      return { path: test.path, type: 'unknown' };
    });
  for (const test of tests) {
    await run(sdjwt, test.type, test.path);
  }
})();
