import User from '../../../models/user';
import { errorFactory } from '../../../errors';
import Jwt from '../../../helpers/JWT';
import redis from '../../../helpers/Redis';
import { authPrefix } from '../../../config';

class AuthService {
  authenticate = async ({ email = '', password }) => {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      throw errorFactory.getError('LOG-0001');
    }

    const [accessToken, refreshToken] = await Promise.all([
      Jwt.generateToken(user.toPayload()),
      Jwt.generateRefreshToken(user.id),
    ]);

    await Promise.all([
      redis.hset(`${authPrefix}:${user.id}`, accessToken, 1),
      redis.hset(`${authPrefix}:${user.id}`, refreshToken, accessToken),
    ]);

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
    };
  };

  logout = (userId) => {
    return redis.hdel(`${authPrefix}:${userId}`);
  };

  getUser = (userId) => {
    return User.findById(userId);
  };

  refrehToken = async (refreshToken) => {
    const payload = await Jwt.verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.userId);
    const accessToken = await Jwt.generateToken(user.toPayload());
    await redis.hset(`${authPrefix}:${user.id}`, accessToken, 1);

    return {
      accessToken,
      tokenType: 'Bearer',
    };
  };
}

export default AuthService;
