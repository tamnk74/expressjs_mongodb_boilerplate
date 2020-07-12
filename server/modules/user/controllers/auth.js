import { authService } from '../services';
import { authSerializer } from '../serializer';

class AuthController {
  login = async (req, res, next) => {
    try {
      const result = await authService.authenticate(req.body);
      return res.status(200).json(authSerializer.serialize(result));
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;
