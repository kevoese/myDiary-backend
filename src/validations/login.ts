import * as Joi from 'joi';
import joiTest from './helpers';

export default (data:any, errorHandler:any) => {
  const userschema = Joi.object().keys({
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