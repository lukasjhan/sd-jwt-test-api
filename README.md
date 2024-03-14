# SD-JWT Testing API server

This is a simple API server to test the various SD-JWT library implementations in different languages.

See the standard of [SD-JWT](https://datatracker.ietf.org/doc/draft-ietf-oauth-selective-disclosure-jwt/) and [SD-JWT VC](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)

## How to run

```bash
pnpm install

pnpm run dev
```

## Server

Server will be running on localhost:5600

```bash
http://localhost:5600
```

## How to Test?

Our Test API uses REST API to test the SD-JWT library implementation.

We provides variouse test cases to test.

- issue
- present
- verify
- decode

If you're familiar with Javascript(axios), you can reference the `tester` directory to see [how to test the API](./tester/README.md).

### APIs

| Method | Path                  | Description                                                                       |
| ------ | --------------------- | --------------------------------------------------------------------------------- |
| GET    | /keys                 | return a ES256 JWK for sign and verify SD-JWT                                     |
| GET    | /test-lists           | return a list of test cases, you can check the following {name} by using this API |
| GET    | /tests/issue/{name}   | return a test case for issue SD-JWT                                               |
| GET    | /tests/present/{name} | return a test case for present SD-JWT                                             |
| GET    | /tests/verify/{name}  | return a test case for verify SD-JWT                                              |
| GET    | /tests/decode/{name}  | return a test case for decode SD-JWT                                              |
| POST   | /tests/issue/{name}   | test a result of {name} test of issue SD-JWT                                      |
| POST   | /tests/present/{name} | test a result of {name} test of present SD-JWT                                    |
| POST   | /tests/verify/{name}  | test a result of {name} test of verify SD-JWT                                     |
| POST   | /tests/decode/{name}  | test a result of {name} test of decode SD-JWT                                     |

### Response Body format

- GET /keys

```json
{
  "results": {
    "publicKey": {
      "key_ops": ["verify"],
      "ext": true,
      "kty": "EC",
      "x": "lFvD07QYuu3fAnY2TGpzXiutOYDu0TF7H6Vv7QRcy1c",
      "y": "OW6zqImPZ48IQjdL-9kf-UqN1gn3YfjUudPhQMcAwEw",
      "crv": "P-256"
    },
    "privateKey": {
      "key_ops": ["sign"],
      "ext": true,
      "kty": "EC",
      "x": "lFvD07QYuu3fAnY2TGpzXiutOYDu0TF7H6Vv7QRcy1c",
      "y": "OW6zqImPZ48IQjdL-9kf-UqN1gn3YfjUudPhQMcAwEw",
      "crv": "P-256",
      "d": "nzRm-iT0fjlPrCrSBqnjgO2PrQO1V37l0ICvZr6CWHs"
    }
  }
}
```

- GET /test-lists

```json
{
  "results": {
    "apiList": [{"path": string, "method": "GET" | "POST"}]
  }
}
```

- GET /tests/issue/{name}

```json
{
  "results": {
    "claims": object,
    "disclosureFrame": object,
  }
}
```

- POST /tests/issue/{name}

```json
// body
{
  "answer": string // Input issued sd-jwt
}

// response
{
  "results": boolean
}
```

- GET /tests/present/{name}

```json
{
  "results": {
    "credential": object,
    "presentationFrame": object,
    "kb": object | undefined
  }
}
```

- POST /tests/present/{name}

```json
// body
{
  "answer": string // Input presented sd-jwt
}

// response
{
  "results": boolean
}
```

- GET /tests/verify/{name}

```json
{
  "results": {
    "credential": string,
  }
}
```

- POST /tests/verify/{name}

```json
// body
{
  "answer": boolean // whether the sd-jwt is valid or not
}

// response
{
  "results": boolean
}
```

- GET /tests/decode/{name}

```json
{
  "results": {
    "credential": string,
  }
}
```

- POST /tests/decode/{name}

```json
// body
{
  "answer": object // decoded claims of sd-jwt
}

// response
{
  "results": boolean
}
```

## How it works?

Thjs project is built using Hono: https://hono.dev/

## Docker

dockerHub : https://hub.docker.com/repository/docker/treeyoon/sd-jwt-test-api/general
