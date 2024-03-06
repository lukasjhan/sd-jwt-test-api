import { serve } from "@hono/node-server";
import { SDJwtInstance } from "@sd-jwt/core";
import { DisclosureFrame } from "@sd-jwt/types";
import { Hono } from "hono";
import isEqual from "lodash.isequal";
import { ES256, digest, generateSalt } from "@sd-jwt/crypto-nodejs";
import { HTTPException } from "hono/http-exception";

const app = new Hono();
const sdjwt = new SDJwtInstance({
  hasher: digest,
});

/**
 * tests data has test names of each cases
 */
const tests = {
  issue: ["testa", "testb"],
  decode: [],
  present: [],
  verify: [],
};

const endpoints = [
  "/test-lists",
  "/keypairs",
  "/tests/issue/{test-name}",
  "/tests/present/{test-name}",
  "/tests/verify/{test-name}",
  "/tests/decode/{test-name}",
  "/tests/present/{test-name}",
  "/tests/issue/{test-name}",
  "/tests/decode/{test-name}",
];

const claims = {
  firstname: "John",
  lastname: "Doe",
  ssn: "123-45-6789",
  id: "1234",
  data: {
    firstname: "John",
    lastname: "Doe",
    ssn: "123-45-6789",
    list: [{ r: "1" }, "b", "c"],
  },
  data2: {
    hi: "bye",
  },
};

const disclosureFrame: DisclosureFrame<typeof claims> = {
  _sd: ["firstname", "id", "data2"],
  data: {
    _sd: ["list"],
    _sd_decoy: 2,
    list: {
      _sd: [0, 2],
      _sd_decoy: 1,
      0: {
        _sd: ["r"],
      },
    },
  },
  data2: {
    _sd: ["hi"],
  },
};

app.get("/test-lists", (c) => {
  return c.json({ result: endpoints });
});

app.get("/tests/issue/p1", (c) => {
  // Issuer Define the disclosure frame to specify which claims can be disclosed

  return c.json({
    description: "Issue a SD-JWT token with given claims and disclosureFrame",
    claims,
    disclosureFrame,
  });
});

app.post("/tests/issue/p1", async (c) => {
  const { answer } = await c.req.json<{ answer: string }>();

  if (!answer) {
    throw new HTTPException(400, { message: "bad request" });
  }
  // tree: 10000000

  const submittedClaims = await sdjwt.getClaims(answer);
  const isCorrect = isEqual(submittedClaims, claims);

  return c.json({
    result: isCorrect,
  });
});

app.post("/", async (c) => {
  return c.json({ result: "hello world!" });
});

const port = 5600;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
