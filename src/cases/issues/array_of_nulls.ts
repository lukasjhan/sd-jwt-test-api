import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  null_values: [null, null, null, null],
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  null_values: {
    _sd: [1, 2],
  },
};

export const presentableKeys = ['null_values.1', 'null_values.2'];
