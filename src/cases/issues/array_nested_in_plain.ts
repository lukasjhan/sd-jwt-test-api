import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  nested_array: [
    ['foo', 'bar'],
    ['baz', 'qux'],
  ],
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  nested_array: {
    0: {
      _sd: [0, 1],
    },
    1: {
      _sd: [0, 1],
    },
  },
};

export const presentableKeys = ['nested_array.0.0', 'nested_array.0.1', 'nested_array.1.0', 'nested_array.1.1'];
