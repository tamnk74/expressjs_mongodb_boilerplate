import Joi from 'joi';
import BaseValidation from "./BaseValidation";

export default class EventValidation extends BaseValidation {
  postData = {
    body: {
      name: Joi.string().max(255).required(),
      startDate: Joi.string().max(255).required(),
      dueDate: Joi.string().required(),
    }
  };

  create = {
    body: this.postData
  };

  update = {
    params: this.validateId,
    body: this.postData
  };
}