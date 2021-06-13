import Jwt from '../../server/helpers/JWT';

const getAccessToken = (user) => Jwt.generateToken({ user }, 1);

export { getAccessToken };
