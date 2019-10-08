import fs from 'fs';
import path from 'path';
import User from '../models/users';
import JWT from '../helpers/JWT';

export default class UserRepository {
  /**
   * authenticate for login
   *
   * @method authenticate
   *
   * @param  {Object} request data
   *
   * @return {string} jwt
   * @throw {Object} Invalid login
   */
  authenticate = async (data) => {
    const { name, password } = data;
    try {
      const user = await User.findOne({
        name
      });

      if (!user) {
        throw new Error('Account not existed');
      }

      if (user.comparePassword(password)) {
        // Create token
        const payload = {
          id: user._id,
        }
        const privateKey = fs.readFileSync(path.resolve(__dirname, '..', 'config', 'cert', 'private.key'), 'utf8');
        const signOptions = {
          issuer: 'Events',
          subject: 'khac.tam.94@gmail.com',
          audience: 'localhost',
          expiresIn: "12h",
          algorithm: "RS256"
        };
        const token = await JWT.sign(payload, privateKey, signOptions);

        return {
          jwt: token,
          user: user
        };
      } else {
        throw new Error('Password is incorrect');
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}