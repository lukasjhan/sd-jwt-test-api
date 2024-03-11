import { PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJuZXN0ZWRfYXJyYXkiOltbeyIuLi4iOiJwUXZXLWg0RUR0YWJKaXpVaFZQM2xyNGNCb051dkpNSTlwNWpCZnlrUHBNIn0seyIuLi4iOiJPdWJZVU9zNnFmdHIya0hTbUgxSUpaaVc5VDBHYktOWnhpbmlqX0FYYXZzIn1dLFt7Ii4uLiI6ImhRTE1hVkJZZEswaW9wOFNoYmJBX19tRy1oWGxpd3RPaV9fTXhlQk5DTEUifSx7Ii4uLiI6IjRrMWFnd0Q4X0ZnTWo2V3laVG91MjRFNTR2T3BqU3ZVbnpTNXpJeEhqdE0ifV1dLCJfc2RfYWxnIjoic2hhLTI1NiJ9.NQSc_rIdlnLBljElQEnISez8QLlkOVVQE6FhBJABswYE9_oq8NBZrbdcalrqydZp0eLWryrvWHtQQ-jGjpqLRQ~WyJhNDk3MWEwZTc4M2RhMTMzIiwiZm9vIl0~WyJlZmJmOTY1YzZlM2VlOGQyIiwiYmFyIl0~WyI1N2VlNjk4NDMxOGE4NWJiIiwiYmF6Il0~WyI4MTVlYWI0YmJmNzkzMjJkIiwicXV4Il0~';

export const claims = {
  nested_array: [['bar'], ['baz']],
};

export const presentationFrame: PresentationFrame<typeof claims> = {
  nested_array: {
    0: {
      1: true,
    },
    1: {
      0: true,
    },
  },
};

export const kb = undefined;
