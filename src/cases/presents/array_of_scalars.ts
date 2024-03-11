import { PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJuYXRpb25hbGl0aWVzIjpbeyIuLi4iOiJIeC0wRThyaS1MaUFUc3czbVgtSWdBalhPYzJ2TVBicWt3MzFOODNuS24wIn0seyIuLi4iOiJwVWtXdkMxZ01PU3pOMnNCNXlUTm5HZmtmRlZHN0NQUWpYWnkydmlGMXhZIn0sIkRFIl0sIl9zZF9hbGciOiJzaGEtMjU2In0.WuSNewuqL4Xh9bzb2yFnRCTNrMNQzUYUSVBR3BVC4H63WmlhKHbMU-vf6rKSsYuoiUnAXCF4wzD_kn-ETLOVzA~WyI4MjIxZmI3ZTE1MzVlMGYzIiwiVVMiXQ~WyJiMzEwNjE5MWVjNzRlZjZkIiwiQ0EiXQ~';

export const claims = {
  nationalities: ['US', 'DE'],
};

export const presentationFrame: PresentationFrame<typeof claims> = {
  nationalities: {
    0: true,
  },
};

export const kb = undefined;
