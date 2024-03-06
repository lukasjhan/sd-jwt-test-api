import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

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

app.get("/test-lists", (c) => {
  return c.json({ result: endpoints });
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
