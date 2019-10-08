import Joi from 'joi';
import Uuid from 'uuid';

export default class BaseValidation {

    pageInfo = {
        page: Joi.number().min(1),
        limit: Joi.number().min(1).max(100),
    };

    validateId = {
        id: Joi.string().guid(Uuid.v4(), 'uuidV4')
    };

    index = {
        query: this.pageInfo
    };

    show = {
        params: this.validateId
    };

    delete = {
        params: this.validateId
    };

}