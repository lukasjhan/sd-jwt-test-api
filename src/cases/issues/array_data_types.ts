import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  data_types: [null, 42, 3.14, 'foo', ['Test'], { foo: 'bar' }],
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  data_types: {
    _sd: [0, 1, 2, 3, 4, 5],
  },
};

export const presentableKeys = [
  'data_types.0',
  'data_types.1',
  'data_types.2',
  'data_types.3',
  'data_types.4',
  'data_types.5',
];
