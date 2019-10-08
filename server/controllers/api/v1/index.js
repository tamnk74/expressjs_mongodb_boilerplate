import EventController from './EventController';
import AuthController from './AuthController';
import UserController from './UserController';
import HomeController from './HomeController';

module.exports = {
  homeController: new HomeController(),
  eventController: new EventController(),
  authController: new AuthController(),
  userController: new UserController(),
};