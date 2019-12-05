import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';
import { AuthenticationError } from 'apollo-server-express';
import { SECRET } from '../env';

const decodeToken = (tokenStr: string): Promise<{id:number, email:string}> =>
  new Promise((res, rej) => {
    jwt.verify(tokenStr, SECRET || '', (err: Error, data: any) => {
      if (err) rej(new Error('invalid token'));
      res(data);
    });
  });

export default async (token: string) => {
  try {
    const { id } = await decodeToken(token);
    const user = await User.query().findById(id);

    if (!user) throw new AuthenticationError('Invalid token!');
    return user;
  } catch (error) {
    // throw auth error
    throw new AuthenticationError('Invalid token!');
  }
};
