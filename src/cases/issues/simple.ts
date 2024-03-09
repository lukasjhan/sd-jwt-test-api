import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  name: 'John',
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  _sd: ['name'],
};

export const presentableKeys = ['name'];
