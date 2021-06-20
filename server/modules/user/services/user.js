export class UserService {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  findAll = () => {
    return this.UserModel.find();
  };

  findById = (userId) => {
    return this.UserModel.find(userId);
  };

  createUser = (user) => {
    return new this.UserModel(user).save();
  };

  updateUser = (userId, data, options) => {
    return this.UserModel.findByIdAndUpdate(userId, data, options);
  };

  removeUser = (userId) => {
    return this.UserModel.findByIdAndRemove(userId);
  };
}
