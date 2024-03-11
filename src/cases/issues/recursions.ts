import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  address: {
    street_address: '123 Main St',
    locality: 'Anytown',
    region: 'Anystate',
    country: 'US',
  },
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  _sd: ['address'],
  address: {
    _sd: ['region', 'country'],
  },
};

export const presentableKeys = ['address', 'address.region', 'address.country'];
