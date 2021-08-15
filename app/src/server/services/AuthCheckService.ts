import { Request } from 'express';

export const checkIsAuth = (req: Request) => {
  if (req.cookies.authCookie?.length) {
    return true;
  }

  return false;
};
