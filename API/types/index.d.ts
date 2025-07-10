import { IUser } from "./userType";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}



export interface JwtPayload {
  id: string
}
