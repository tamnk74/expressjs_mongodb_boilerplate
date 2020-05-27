import User from '../../../models/user';
import { errorFactory } from '../../../errors';
import jwt from '../../../helpers/JWT';

class AuthService {
  authenticate = async ({ name, password }) => {
    const user = await User.findOne({ name });
    if (!user.comparePassword(password)) {
      throw errorFactory.getError('LOG-0001');
    }

    const token = jwt.sign({ id: user.id });
    return {
      user: {
        id: user.id,
        name: user.name
      },
      token
    };
  }
}

export default AuthService;
