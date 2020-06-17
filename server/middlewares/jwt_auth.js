import { errorFactory } from '../errors';
import User from '../models/user';
import JWT from '../helpers/JWT';

export default async (req, res, next) => {
  try {
    const token = JWT.getToken(req);
    if (!token) {
      return next(errorFactory.getError('ERR-0401'));
    }

    const jwtPayload = await JWT.verify(token);
    const user = await User.findById(jwtPayload.id);
    if (!user) {
      return next(errorFactory.getError('ERR-0401'));
    }

    req.user = user;

    next();
  } catch (e) {
    return next(errorFactory.getError('ERR-0401'));
  }
};
