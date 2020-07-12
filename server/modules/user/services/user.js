import User from '../../../models/user';
import errorFactory from '../../../errors';

class UserService {
  authenticate = async ({ name, password }) => {
    const user = await User.findOne({ name });
    if (user.comparePassword(password)) {
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
        ...user.toJSON(),
        token,
      };
    }
    throw errorFactory.getError('ERR-0400');
  };
}

export default UserService;
