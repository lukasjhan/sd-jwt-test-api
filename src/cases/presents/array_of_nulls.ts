import { PresentationFrame } from '@sd-jwt/types';

export const credential =
  'eyJhbGciOiJFUzI1NiJ9.eyJudWxsX3ZhbHVlcyI6W251bGwseyIuLi4iOiI0alh5QTByVDl3Ui1sTFprQWJyYWYzbW0zZ0R6cEZQcUlna0RHdG1ERkV3In0seyIuLi4iOiJRaFpQTUp6X2tPOS1rZEkyejBsZTVJZTV1T0FXSGpmQ01tSVJjS2hBN3pnIn0sbnVsbF0sIl9zZF9hbGciOiJzaGEtMjU2In0.wQGb0mj6xQ1joTgL2w69UXLg_oV78MPoGI2VX73GJG20vEjOSlhuynQfguVIhxlro_uGadtsg_yRgnWEIIDhJg~WyIzZWVmMjc4ZmM4YjczMzZlIixudWxsXQ~WyJmMzYzMTNkYzYyOTg0YmU1IixudWxsXQ~';

export const claims = {
  null_values: [null, null, null],
};

export const presentationFrame: PresentationFrame<typeof claims> = {
  null_values: {
    1: true,
  },
};

export const kb = undefined;
