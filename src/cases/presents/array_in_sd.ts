import { PresentationFrame } from '@sd-jwt/types';

export const claims = {
  sd_array: ['32', '23'],
};

export const presentationFrame: PresentationFrame<typeof claims> = {
  sd_array: true,
};

export const kb = undefined;
