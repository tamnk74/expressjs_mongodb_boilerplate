import { errorFactory } from '../../../errors';
import Jwt from '../../../helpers/JWT';
import Redis from '../../../helpers/Redis';

export class AuthService {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  authenticate = async ({ email = '', password }) => {
    const user = await this.UserModel.findOne({ email });
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
    return this.UserModel.findById(userId);
  };

  refreshToken = async (refreshToken) => {
    const payload = await Jwt.verifyRefreshToken(refreshToken);
    const user = await this.UserModel.findById(payload.userId);
    const accessToken = await Jwt.generateToken(user.toPayload(), 1);

    return {
      accessToken,
      tokenType: 'Bearer',
    };
  };
}
