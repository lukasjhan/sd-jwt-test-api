import { PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJhZGRyZXNzZXMiOlt7InN0cmVldCI6IjEyMyBNYWluIFN0IiwiY2l0eSI6IkFueXRvd24iLCJzdGF0ZSI6Ik5ZIiwiemlwIjoiMTIzNDUiLCJ0eXBlIjoibWFpbl9hZGRyZXNzIn0seyIuLi4iOiJpRzR4TFlIZVRVRHhUU0MtdW81WmxUY0ZKWlkxVjJtb0R0azJscTluVGRNIn1dLCJhcnJheV93aXRoX29uZV9zZF9vYmplY3QiOnsiX3NkIjpbIjhWOXNoY0gybzJXVHVGTmtYVmNqWjZVOXViY05qUVl0WkdGaFlxVURvLTAiXX0sIl9zZF9hbGciOiJzaGEtMjU2In0.T5aDQ3wzOeFUnfL7tDW98mvR57qZQYaSF3VF5sDGe3ZQKsZVzNd151Wqb-RMgw1_O1uA1SVAl1c1toM0N5szyw~WyI2YzA0OTBiNjYwNzEwNjg3Iix7InN0cmVldCI6IjQ1NiBNYWluIFN0IiwiY2l0eSI6IkFueXRvd24iLCJzdGF0ZSI6Ik5ZIiwiemlwIjoiMTIzNDUiLCJ0eXBlIjoic2Vjb25kYXJ5X2FkZHJlc3MifV0~WyI0ZTQxMWQ1MTVmOTNjNDkyIiwiZm9vIiwiYmFyIl0~';

export const claims = {
  addresses: [
    {
      street: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      zip: '12345',
      type: 'main_address',
    },
  ],
  array_with_one_sd_object: {
    foo: 'bar',
  },
};

export const presentationFrame: PresentationFrame<typeof claims> = {
  array_with_one_sd_object: {
    foo: true,
  },
};

export const kb = undefined;
