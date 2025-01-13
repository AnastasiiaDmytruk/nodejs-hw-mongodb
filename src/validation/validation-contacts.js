import Joi from 'joi';
import { typeList } from '../constants/constants-contacts.js';

export const contactAddScema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'string.empty': 'Name is definitly required' }),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
  contactType: Joi.string()
    .valid(...typeList) // розпилюємо тому що в valid передається масив значень через кому
    .required(),
});
export const contactUpdateScema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'string.empty': 'Name is definitly required' }),
  phoneNumber: Joi.string(),
  email: Joi.string(),
  contactType: Joi.string().valid(...typeList),
});
