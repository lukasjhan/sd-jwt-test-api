import { DisclosureFrame, PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJfc2QiOlsicjVfZnhTbmFwRUFPM0h2eThOZUpIVVdYU1VYcG05TENfZWNlMzQ0Q2hjdyJdLCJfc2RfYWxnIjoic2hhLTI1NiJ9.hiG94ekZY1HEoVV_vGlkZ8HahmySVfZv3LubyJvHxamgHwUvy4RQN2pJgAFfFe1PNYdCREOejckSP3ofBZxSzg~WyIwM2I1MDM0ZTZhYTBjZjg2IiwiVVMiXQ~WyI5OThkNzZlZDYwNGNmN2RjIiwibmF0aW9uYWxpdGllcyIsW3siLi4uIjoiRkVpWlZsRVMzbDJWZ1l6RFpHVmk2dzUtT3M5Y1Y3ZjZZcU9LcjAxMjBYZyJ9LCJDQSIsIkRFIl1d~WyIyNmRhMTJkMjEzMTczMjE4Iix7Il9zZCI6WyIwU3BnamJ6dU9pS0k4OWZzN1VqWUFUMDlUbHRaMUo0eWpuTTN5M0tMdEc4Il19XQ~WyJmYTlhM2FhNWRjNmQyOWJiIix7Im5hdGlvbmFsaXRpZXMiOlsiS08iLCJKUCIsIkNOIl19XQ~WyJiZWZiMGFmYjBkZWNmZDk4IiwiZGF0YSIsW3siLi4uIjoiVGx6dDVtLXR6STFqNkc4SHIyQ0ptNXF3ZlIwdG14MF9UMnhBdFd3aGN1ayJ9LHsiLi4uIjoib0VuMXFEQWN6NVIwSklQVGNIajFrZncwTWhNTnpwRVZvUkJYV3pJM0ZabyJ9XV0~';

export const claims = {
  data: [
    {
      nationalities: ['US', 'CA', 'DE'],
    },
    {
      nationalities: ['KO', 'JP', 'CN'],
    },
  ],
};
