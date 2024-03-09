import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  addresses: [
    {
      street: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      zip: '12345',
      type: 'main_address',
    },
    {
      street: '456 Main St',
      city: 'Anytown',
      state: 'NY',
      zip: '12345',
      type: 'secondary_address',
    },
  ],
  array_with_one_sd_object: {
    foo: 'bar',
  },
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  addresses: {
    _sd: [1],
  },
  array_with_one_sd_object: {
    _sd: ['foo'],
  },
};

export const presentableKeys = ['addresses.1', 'array_with_one_sd_object.foo'];
