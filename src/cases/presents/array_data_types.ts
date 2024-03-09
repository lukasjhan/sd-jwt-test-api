import { PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJkYXRhX3R5cGVzIjpbeyIuLi4iOiJ5NFpMS0V6cG5maHF3aFRkajFpMGhHMDNNSFV4aHdKdTg0V0szQWduckw0In0seyIuLi4iOiJzS3pTUHVzNDhLaE1hdklQdEpYRFNtakpCMFBnek51T05MLVFqOU92M0ZRIn0seyIuLi4iOiJVMi01dERheHN2WGxrV3ZiVnVoVzUycmYxX2tMbnM0MmpqWXBuVlhGSEZZIn0seyIuLi4iOiI2RDhLT1pNcjh0RVhSYlQzbVItY1JjSF9Pa0t1YnJQZ1RDb0FSYVprNHJBIn0seyIuLi4iOiJNYjZqdHREeEo1Y045SXJKVVYtYUxzOEtidlFsRWN5S2pmQmlhRDBGRVlJIn0seyIuLi4iOiJPazQxVDU0SUlnWlZ5VUNwTVo4OC1xdHZFSEE5WS1BRUk2aUE2Ym1pbUs4In1dLCJfc2RfYWxnIjoic2hhLTI1NiJ9.e0-SRBSJePVNtg5KU-c3ldOEcTgAuI95CzZVwsvbqJscZDk4bSqBSCaWZhFo6YruA285kDX5rFKH478LHCkEQA~WyIyOGE1NmZlNWE1NjNiYjI1IixudWxsXQ~WyJkZjZjMTA0NzBmYzFlZGI0Iiw0Ml0~WyJiZWZjZjQ0YjRmMThlNWZiIiwzLjE0XQ~WyJkZjdiNzNlOGNmNGQ2N2EyIiwiZm9vIl0~WyJhNGIxNmVkMjA4NDBlZWFkIixbIlRlc3QiXV0~WyI0ZmUwMzUwYjBmM2Y1OTM5Iix7ImZvbyI6ImJhciJ9XQ~';

export const claims = {
  data_types: [null, 42, 3.14, 'foo', ['Test'], { foo: 'bar' }],
};

export const presentationFrame: PresentationFrame<typeof claims> = {
  data_types: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  },
};

export const kb = undefined;
