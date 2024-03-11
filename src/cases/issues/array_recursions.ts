import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  data: [
    {
      nationalities: ['US', 'CA', 'DE'],
    },
    {
      nationalities: ['KO', 'JP', 'CN'],
    },
  ],
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  _sd: ['data'],
  data: {
    _sd: [0, 1],
    0: {
      _sd: ['nationalities'],
      nationalities: {
        _sd: [0],
      },
    },
  },
};

export const presentableKeys = ['data', 'data.0', 'data.1', 'data.0.nationalities', 'data.0.nationalities.0'];
