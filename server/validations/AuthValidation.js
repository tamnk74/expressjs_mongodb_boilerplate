import Joi from 'joi';
import BaseValidation from "./BaseValidation";

export default class AuthValidation extends BaseValidation {

  loginForm = {
    body: {
      email: Joi.string().email().max(255),
      name: Joi.string().max(50),
      password: Joi.string().min(6).max(50),
    },
  };

  registerForm = {
    body: {
      email: Joi.string().email().max(255),
      name: Joi.string().max(50),
      password: Joi.string().min(6).max(50),
    },
  };

  updateProfile = {
    body: {
      email: Joi.string().email().max(255),
      name: Joi.string().max(50),
      fullName: Joi.string().max(50),
      birthday: Joi.date().optional().min('1-1-1980').max('1-1-2020'),
      address: Joi.string().max(255),
      password: Joi.string().min(6).max(50),
    },
  };

}