import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  nationalities: ['US', 'CA', 'DE'],
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  nationalities: {
    _sd: [0, 1],
  },
};

export const presentableKeys = ['nationalities.0', 'nationalities.1'];
