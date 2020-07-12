import authMiddleware from './Auth';
import Error from './Error';

export const auth = authMiddleware;
export const error = new Error();
