import User from '../../../models/user';
import { errorFactory } from '../../../errors';
import Jwt from '../../../helpers/JWT';
import Redis from '../../../helpers/Redis';

class AuthService {
  authenticate = async ({ email = '', password }) => {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      throw errorFactory.getError('LOG-0001');
    }

    const [accessToken, refreshToken] = await Promise.all([
      Jwt.generateToken(user.toPayload(), 1),
      Jwt.generateRefreshToken(user.id),
    ]);

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
    };
  };

  logout = (userId, token) => {
    return Redis.removeAccessToken(userId, token);
  };

  getUser = (userId) => {
    return User.findById(userId);
  };

  refreshToken = async (refreshToken) => {
    const payload = await Jwt.verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.userId);
    const accessToken = await Jwt.generateToken(user.toPayload(), 1);

    return {
      accessToken,
      tokenType: 'Bearer',
    };
  };
}

export default AuthService;
