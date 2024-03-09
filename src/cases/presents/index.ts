import * as simple from './simple';
import * as data_types from './data_types';
import * as array_data_types from './array_data_types';
import * as array_in_sd from './array_in_sd';
import * as array_nested_in_plain from './array_nested_in_plain';
import * as array_of_scalars from './array_of_scalars';
import * as array_of_nulls from './array_of_nulls';
import * as array_of_objects from './array_of_objects';
import * as recursions from './recursions';
import * as recursions_part from './recursions_part';
import * as array_recursions from './array_recursions';
import * as array_recursions_part from './array_recursions_part';
import * as kb from './kb';
import * as no_sd from './no_sd';

/**
 * @description
 * Test cases for issues.
 * Each case should have a `credential`, `claims`, `presentationFrame`, and `kb` export.
 *
 */
export const testcases = {
  simple,
  data_types,
  array_data_types,
  array_in_sd,
  array_nested_in_plain,
  array_of_scalars,
  array_of_nulls,
  array_of_objects,
  recursions,
  recursions_part,
  array_recursions,
  array_recursions_part,
  kb,
  no_sd,
};
