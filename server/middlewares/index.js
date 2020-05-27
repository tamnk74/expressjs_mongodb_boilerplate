import authMiddleware from './auth';
import Error from './error';


export const auth = authMiddleware;
export const error = new Error();
