import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  firstname: 'John',
  lastname: 'Doe',
  ssn: '123-45-6789',
  id: '1234',
  data: {
    firstname: 'John',
    lastname: 'Doe',
    ssn: '123-45-6789',
    list: [{ r: '1' }, 'b', 'c'],
  },
  data2: {
    hi: 'bye',
  },
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  _sd: ['firstname', 'id', 'data2'],
  data: {
    _sd: ['list'],
    _sd_decoy: 2,
    list: {
      _sd: [0, 2],
      _sd_decoy: 1,
      0: {
        _sd: ['r'],
      },
    },
  },
  data2: {
    _sd: ['hi'],
  },
};

export const presentationFrame = ['firstname', 'id'];
export const presentationClaim = {
  lastname: 'Doe',
  ssn: '123-45-6789',
  data: {
    firstname: 'John',
    lastname: 'Doe',
    ssn: '123-45-6789',
  },
  firstname: 'John',
  id: '1234',
};
