import * as Joi from 'joi';
import joiTest from './helpers';
// import User from '../database/models/User';

export default async (data:any, errorHandler:any) => {
//   const fetchUser = await User.query().where('email', data.email).orWhere('username', data.username);
  
//  if(fetchUser.length) throw new errorHandler('User with this email already exist');
  const userschema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .min(3)
      .required(),
    username: Joi.string()
      .trim()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
  });
  joiTest(data, userschema, errorHandler);
};