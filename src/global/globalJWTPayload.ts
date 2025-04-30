/* eslint-disable @typescript-eslint/no-namespace */
import { JWTPayload } from '../types/auth';

export { };

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
} 