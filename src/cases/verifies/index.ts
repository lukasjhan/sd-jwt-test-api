import * as simple from './simple';
import * as simple_no_sd from './simple_no_sd';
import * as sig_fail from './sig_fail';
import * as kb from './kb';
import * as kb_sig_fail from './kb_sig_fail';
import * as kb_no_sd from './kb_no_sd';
import * as kb_hash_fail from './kb_hash_fail';

/**
 * @description
 * Test cases for verify.
 * Each case should have a `credential`, `result` export.
 *
 */
export const testcases = {
  simple,
  simple_no_sd,
  sig_fail,
  kb,
  kb_sig_fail,
  kb_no_sd,
  kb_hash_fail,
};
