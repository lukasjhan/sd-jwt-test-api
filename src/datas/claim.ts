import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  firstname: 'John',
  lastname: 'Doe',
  ssn: '123-45-6789',
  id: '1234',
  data: {
    firstname: 'John',
    lastname: 'Doe',
    ssn: '123-45-6789',
    list: [{ r: '1' }, 'b', 'c'],
  },
  data2: {
    hi: 'bye',
  },
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  _sd: ['firstname', 'id', 'data2'],
  data: {
    _sd: ['list'],
    _sd_decoy: 2,
    list: {
      _sd: [0, 2],
      _sd_decoy: 1,
      0: {
        _sd: ['r'],
      },
    },
  },
  data2: {
    _sd: ['hi'],
  },
};

export const presentationFrame = ['firstname', 'id'];
export const presentationClaim = {
  lastname: 'Doe',
  ssn: '123-45-6789',
  data: {
    firstname: 'John',
    lastname: 'Doe',
    ssn: '123-45-6789',
  },
  firstname: 'John',
  id: '1234',
};

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiZGF0YSI6eyJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJzc24iOiIxMjMtNDUtNjc4OSIsIl9zZCI6WyIzbzBmYVlnaGpnSUFEcnlacHh5WjlLMGdXVEt6SXNUamJBZWZ5Z2RtZFZJIiwiRFhueUVxa25oSHdkcmpKbzZ2UWpkVXA5bnI5WGdVVldHeWhJbkxpdktsQSIsInJ3X3BnVmZ0OEJsc3FTQ3Nnczk4OXN6aVNnY0loNzFwRGw1VDI2YzNUNDQiXX0sIl9zZCI6WyJGVUtCdW81WXFSbmY2N0VhZzV5RHAxeVVpb2xCSEZnQmEweGc1MWdKTGI4IiwiaTNubWw0YW9GNFZZZUt6NUdZdnVjeXJ5VDM4TlVxUG00QXZaTzY4eUVNTSIsImtWVU1nX1hGcjBwamdkbTl1cFpUbTgxVkVjaWF5LTJaOWd2Rmo5RkhBWXMiXSwiX3NkX2FsZyI6IlNIQS0yNTYifQ.927feVeSgpUkXqleM6fq1xRNUWsmqFDKjU4sWlT4UUPk3SLKKETCscP7eLbldXBugjQ11H4GKnCxSLPsbRsLDA~WyI5YjQzZTg3MTUzNmZkOTBmIiwiciIsIjEiXQ~WyIwZjVlZDQzNjU0YTBhZGFlIix7Il9zZCI6WyItd3A2cUdCSzVsVExLbTloY2JnenYxT2tUdnZyYnFoVDFBTDlEd3ZPNjVjIl19XQ~WyI4NzIwMTk3NDlhY2Q5NTdlIiwiYyJd~WyIwNGRlYjY0MmI2OWI1ZTAwIiwibGlzdCIsW3siLi4uIjoiTWlaTWNuSUs5bmE2aW9qcTBRZ00xREQxOENRaklGRl83cFFqamNIZ0RlcyJ9LCJiIix7Ii4uLiI6InpsNXd6QllKcDNUTjN4TzFNUlNWbURoTVZIajhQTHZ4cUwxUVBYeks4Vk0ifSx7Ii4uLiI6Imd1djBEZ3ZSSFh1bjN5dFdfWndWQWpHT05kNE40eDVKOHZpVFFlOVJ5RDgifV1d~WyJjMzEyOWJlZTU4NWRiZGU4IiwiaGkiLCJieWUiXQ~WyJmODk4ZWE0MTQwYjRmMjNiIiwiZmlyc3RuYW1lIiwiSm9obiJd~WyIyMzY3YWE1YmIyYjc1MGRlIiwiaWQiLCIxMjM0Il0~WyIzMTEyYTRjNWE1NzI3YWQyIiwiZGF0YTIiLHsiX3NkIjpbIlpKNWFUSi1QeUZKcEMtTmNMUWpnbzFnclFGN0hZYkF0QVY1YlNBbGh0dTQiXX1d~';

export const presentableKeyList = [
  'data.list',
  'data.list.0',
  'data.list.0.r',
  'data.list.2',
  'data2',
  'data2.hi',
  'firstname',
  'id',
];
