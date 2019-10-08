import Joi from 'joi';
import BaseValidation from "./BaseValidation";

export default class UserValidation extends BaseValidation {

	userData = {
		name: Joi.string().min(3).max(50),
		password: Joi.string().min(6).max(50),
	};

	create = {
		body: this.userData
	};

	update = {
		params: this.validateId,
		body: this.userData
	};
}