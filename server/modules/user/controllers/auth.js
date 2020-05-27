import { authService } from '../services'

class AuthController {
  login = async (req, res, next) => {
    try {
      const result = await authService.authenticate(req.body);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;
