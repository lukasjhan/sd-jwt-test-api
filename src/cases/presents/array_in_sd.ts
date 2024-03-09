import { PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJfc2QiOlsiYm1yRExRMWVmUkxrSDg3UzJJbkpfVmN0cFdnLXJaZl9TR0x1WHVDNlNJayJdLCJfc2RfYWxnIjoic2hhLTI1NiJ9.ryXW-BY6lEDqFiFRlBkIh0uJbJuUBHZg0k4uIXIaxUBgnjkev9nH9X-w_LllT5sP2WYikTgFT8EhxOg__ARMTQ~WyJjNTY0MTE3YjZhN2FiOWQyIiwic2RfYXJyYXkiLFsiMzIiLCIyMyJdXQ~';

export const claims = {
  sd_array: ['32', '23'],
};

export const presentationFrame: PresentationFrame<typeof claims> = {
  sd_array: true,
};

export const kb = undefined;
