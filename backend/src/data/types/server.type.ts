import { Favorite } from 'data/models';

export interface Session {
  cookie: Cookie;
  passport: Passport;
}

export interface Cookie {
  originalMaxAge: number;
  expires: Date;
  secure: boolean;
  httpOnly: boolean;
  path: string;
}

export interface Passport {
  user: User;
}
interface User {
  id: string;
  email: string;
  favorites: Array<Favorite>;
}

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
    }
  }
}
