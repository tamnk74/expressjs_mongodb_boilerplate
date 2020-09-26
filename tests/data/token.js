import Jwt from '../../server/helpers/JWT';
import { user, userTwo, admin } from './user';

const userAccessToken = Jwt.generateToken({ user: { id: user._id } }, 1);
const userTwoAccessToken = Jwt.generateToken({ user: { id: userTwo._id } }, 1);
const adminAccessToken = Jwt.generateToken({ user: { id: admin._id } }, 1);

export { userAccessToken, userTwoAccessToken, adminAccessToken };
