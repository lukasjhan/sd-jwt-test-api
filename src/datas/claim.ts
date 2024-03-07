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
  'eyJhbGciOiJFUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiZGF0YSI6eyJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJzc24iOiIxMjMtNDUtNjc4OSIsIl9zZCI6WyJKbEV1LS16MWJaZzIzQTIzWm5qR0VYUXJqVUpvVTFuQXVxWWNWTjUyd09RIiwiZjlNNnhTT0plYS1odDhrSkNPaWtDRkxtTzEzd2UtLWdlVkl2UkpzVEI3VSIsInVsczBTOFJKTFR6d2JnMUVqV1B4Z01rUGxZMGZMNk1iRWJOTnhZbi0xVGciXX0sIl9zZCI6WyJRX2s3VXFjUVFsU3lRZkVfWi1xWGluWkh6dDBoUjRoZk5UYlB6amxybEtrIiwibWt6MHI3Ry13UUdReWlLcGpub0JLazZXa1lWZTJGRThxbjQtYkdrSjFqcyIsInk2ekFwYkJIS3RuZ2Z3MjFqZmVCZVp6Q0JXQmU4a0xzTzVJSG95Q0JESkkiXSwiX3NkX2FsZyI6IlNIQS0yNTYifQ.SpF5QpN1HiqZ5C-0mDYKVdxpBrRoOL9R-_ZZHcJxbLkJxvc6ZyOsaAFJXWk8nKpVBdkzvO8CNVGbiAqWhBpsoA~WyJiY2E1NmU0MGZjMjE0ZDE1IiwiciIsIjEiXQ~WyJhZjNiOGY1ZDI0ZjcxYWM0Iix7Il9zZCI6WyJ6b0ZBLXhTZmlPQ3FSRGstaFpBazQxRzFVVFg2akZCTnliUnZwd3JCYXQ0Il19XQ~WyJiNWIwYzBkMmEzZjcwZGY1IiwiYyJd~WyI2M2YwNTNmNDIyOTBlM2U2IiwibGlzdCIsW3siLi4uIjoibkxWTXRzR3ZWWi1DTzdUWGRzT0htczR1MVNfc08xLVNRZzF6LXE5YnZtTSJ9LCJiIix7Ii4uLiI6Im5vVEpjSWcyT09zZkpZU3lVeUlDX3lXZlR3TGdDektMZFhZNkNIcU9WQmsifSx7Ii4uLiI6IjJ4QV9ueW12RkN6STZZeEVwUW85b3pydUNfZWZYa2o0cGIzSlctWkJhSG8ifV1d~WyJmYWY4OWZiZTcxYzNkODJhIiwiaGkiLCJieWUiXQ~WyI5YjZiMjg3OTFhZTg1ZTA1IiwiZmlyc3RuYW1lIiwiSm9obiJd~WyI5ZjlmMmZkZjBlNTg4YWUxIiwiaWQiLCIxMjM0Il0~WyJmNGM0MjRkMTJmODlkMmZlIiwiZGF0YTIiLHsiX3NkIjpbImFWcThLYU91SHdZaWdkdFZmLUJfbExtcjNqTDk5VzhWYkd3Nzd4S0lFRGsiXX1d~';
