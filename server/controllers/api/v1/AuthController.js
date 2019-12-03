import Response from '../../../helpers/Response';
import HTTPStatus from 'http-status';
import { userRepository } from '../../../repositories'
import { __ } from 'i18n';

export default class AuthController {
  login = async (req, res) => {
    try {
      const { jwt, user } = await userRepository.authenticate(req.body);
      const result = {
        'message': __('login.success'),
        'token': jwt,
        'user': user
      }
      return Response.success(res, result);
    } catch (e) {
      return Response.error(res, e, HTTPStatus.INTERNAL_SERVER_ERROR);
    }
  };
}