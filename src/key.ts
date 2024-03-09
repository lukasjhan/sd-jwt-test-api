export const KeyPair: { publicKey: JsonWebKey; privateKey: JsonWebKey } = {
  publicKey: {
    key_ops: ['verify'],
    ext: true,
    kty: 'EC',
    x: 'lFvD07QYuu3fAnY2TGpzXiutOYDu0TF7H6Vv7QRcy1c',
    y: 'OW6zqImPZ48IQjdL-9kf-UqN1gn3YfjUudPhQMcAwEw',
    crv: 'P-256',
  },
  privateKey: {
    key_ops: ['sign'],
    ext: true,
    kty: 'EC',
    x: 'lFvD07QYuu3fAnY2TGpzXiutOYDu0TF7H6Vv7QRcy1c',
    y: 'OW6zqImPZ48IQjdL-9kf-UqN1gn3YfjUudPhQMcAwEw',
    crv: 'P-256',
    d: 'nzRm-iT0fjlPrCrSBqnjgO2PrQO1V37l0ICvZr6CWHs',
  },
};
