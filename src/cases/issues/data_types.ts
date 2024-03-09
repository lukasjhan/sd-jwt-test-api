import { DisclosureFrame } from '@sd-jwt/types';

export const claims = {
  value_Data_types: {
    test_null: null,
    test_int: 42,
    test_float: 3.14,
    test_str: 'foo',
    test_bool: true,
    test_arr: ['Test'],
    test_object: {
      foo: 'bar',
    },
  },
};

export const disclosureFrame: DisclosureFrame<typeof claims> = {
  value_Data_types: {
    _sd: ['test_null', 'test_int', 'test_float', 'test_str', 'test_bool', 'test_arr', 'test_object'],
  },
};

export const presentableKeys = [
  'value_Data_types.test_null',
  'value_Data_types.test_int',
  'value_Data_types.test_float',
  'value_Data_types.test_str',
  'value_Data_types.test_bool',
  'value_Data_types.test_arr',
  'value_Data_types.test_object',
];
