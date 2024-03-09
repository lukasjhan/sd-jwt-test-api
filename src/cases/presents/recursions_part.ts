import { PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJfc2QiOlsicWxOVlJnUzFVcFZCNmhmSWNSa1YzV3dRdzNRR21IYThZaWF1bjZYeHBWZyJdLCJfc2RfYWxnIjoic2hhLTI1NiJ9.SgwNpN2jvIbvUg_6aQxnqwzRfIguLPm4Xf1zSOaGafCIHMRZkC47b-nsicy48zBcEaGr5yCyhGI1jBSPNhAQyQ~WyI2NWFiMGNlZjI2M2UxZTc4IiwicmVnaW9uIiwiQW55c3RhdGUiXQ~WyJlNWE2NjM1MzViZTY5MDRhIiwiY291bnRyeSIsIlVTIl0~WyIwNzc5MTMzNjI4MjcxZWUxIiwiYWRkcmVzcyIseyJzdHJlZXRfYWRkcmVzcyI6IjEyMyBNYWluIFN0IiwibG9jYWxpdHkiOiJBbnl0b3duIiwiX3NkIjpbIjM0Rm1SUWp1emp3bGMwcVJjOS1Jdjl4UGRQbC04anVUajFKUE1zTmZLV0UiLCJnaElaRGVrSGVFaXIxeXQtMGlBSUU1a2hIc3B0UGRxNmxNVkRQOUFZZ1E0Il19XQ~';

export const claims = {
  address: {
    street_address: '123 Main St',
    locality: 'Anytown',
  },
};

export const presentationFrame: PresentationFrame<typeof claims> = {
  address: true,
};

export const kb = undefined;
