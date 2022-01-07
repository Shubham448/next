import jwt from 'jsonwebtoken';
import uuid4 from 'uuid4';

const app_access_key = process.env.APP_ACCESS_KEY_100MS;
const app_secret = process.env.APP_SECRET_100MS;

export const managementToken = async () =>
  jwt.sign(
    {
      access_key: app_access_key,
      type: 'management',
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000)
    },
    app_secret,
    {
      algorithm: 'HS256',
      expiresIn: '24h',
      jwtid: uuid4()
    },
  );

export const appToken = (room_id, user_id, role) =>
  jwt.sign(
    {
      access_key: app_access_key,
      room_id,
      user_id,
      role,
      type: 'app',
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000)
    },
    app_secret,
    {
      algorithm: 'HS256',
      expiresIn: '24h',
      jwtid: uuid4()
    },
  );
