import * as Joi from 'joi';

const joiFormat = (error:any) => {
  const field = error.details[0].context.key;
  if (error.details[0].type === 'string.regex.base')
    return `wromg input for ${field}`;
  let format = error.message;
  format = format.slice(format.indexOf('[') + 1, format.indexOf(']'));
  format = format.replace(/"/gi, '');
  return format;
};

const joiTest = (testObj: any, schemaObj: any, errorHandler: any) => {
  Joi.validate(testObj, schemaObj, (err: any) => {
    if (err) {
      throw new errorHandler(joiFormat(err));
    }
  });
};

export default joiTest;
