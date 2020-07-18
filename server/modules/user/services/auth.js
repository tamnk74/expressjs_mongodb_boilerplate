import User from '../../../models/user';
import { errorFactory } from '../../../errors';
import jwt from '../../../helpers/JWT';

class AuthService {
  authenticate = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user.comparePassword(password)) {
      throw errorFactory.getError('LOG-0001');
    }

    const accessToken = jwt.generateToken({ user: { id: user.id } });

    return {
      tokenType: 'bearer',
      accessToken,
    };
  };
}

export default AuthService;
