import { User } from '../types/user.types.js';
import type { jwtPayload } from './jwt.types.ts';

declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload
    }
  }
}
