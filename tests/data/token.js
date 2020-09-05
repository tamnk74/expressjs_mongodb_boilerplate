import Jwt from '../../server/helpers/JWT';
import { user, userTwo, admin } from './user';

const userAccessToken = Jwt.generateToken({ user: { id: user._id } });
const userTwoAccessToken = Jwt.generateToken({ user: { id: userTwo._id } });
const adminAccessToken = Jwt.generateToken({ user: { id: admin._id } });

export { userAccessToken, userTwoAccessToken, adminAccessToken };
