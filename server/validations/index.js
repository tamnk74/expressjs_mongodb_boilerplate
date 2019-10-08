import AuthValidation from './AuthValidation';
import EventValidation from "./EventValidation";
import UserValidation from "./UserValidation";


module.exports = {
    authValidation: new AuthValidation(),
    userValidation: new UserValidation(),
    eventValidation: new EventValidation(),
};