import { PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJ2YWx1ZV9EYXRhX3R5cGVzIjp7Il9zZCI6WyJEQ2QxQ0VzQXloMXEyR0V1MERzYnJJTWpydkl0M2FvUG9jWmxSSXBmVFBVIiwiRzAxZVVEMHBWQVVpV2hXVEM1cG5JSVgwcV9MS1dnWEtGaE9VbEtuUE9pbyIsIlVfVnFjdndEQlV6cFZGMHV1bnF4SzIwWXBENHM2OEdTdWYtODhNZ2tHNTgiLCJWcTJDZmRMVl9DYTBINU1uR3lYeTNXNGpVTnN5WHVmOVlUYUZVM0VyWmk0IiwiX20zMnh3MDVhUGlfNG96aW9CLWxjdFZjUS1yNUlYVDBRZXpmUmdVQkdDRSIsImVZc0V6bTZsamJURENza3FKNlZtY1RNdkE5QVg2dXk2cm16RUNXWk4xWU0iLCJoMmdmeExJR0tVRGV2S05xbnltTWsyOERBZFBsNUhyWTE5U1ZnT1hxeGJzIl19LCJfc2RfYWxnIjoic2hhLTI1NiJ9.59kmgfSKXE8yBaI4jIi-ssyCfBg7sG9AKy4xztJBf-89keQSoNpKnmNsVy5eJQLKKVFlS6CWbMVpf0hYmoK5Og~WyIwZTU5YWE5NmFmMDYwYWIxIiwidGVzdF9udWxsIixudWxsXQ~WyIyZDY0M2U2OTEzY2M2YWVkIiwidGVzdF9pbnQiLDQyXQ~WyJmZmY1NTU2MDgwNWVlNjk1IiwidGVzdF9mbG9hdCIsMy4xNF0~WyI2MmU2OGYyYTQwNGIxMDNjIiwidGVzdF9zdHIiLCJmb28iXQ~WyIyZmNlN2QyNDI4NzNmNzQwIiwidGVzdF9ib29sIix0cnVlXQ~WyI3ZDZjNjRkZGEyOWY0YzIyIiwidGVzdF9hcnIiLFsiVGVzdCJdXQ~WyIxOWM4MGU5NGZiOTdlN2JmIiwidGVzdF9vYmplY3QiLHsiZm9vIjoiYmFyIn1d~';

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

export const presentationFrame: PresentationFrame<typeof claims> = {
  value_Data_types: {
    test_null: true,
    test_int: true,
    test_float: true,
    test_str: true,
    test_bool: true,
    test_arr: true,
    test_object: true,
  },
};

export const kb = undefined;
