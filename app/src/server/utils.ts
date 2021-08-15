import { Request, Response } from 'express';
import { Response as NodeFetchResponse } from 'node-fetch';
import setCookie from 'set-cookie-parser';

export function getCookieFromRequest(req: Request) {
  const Cookie = req.headers.cookie;
  return Cookie ? { Cookie } : undefined;
}

export function setCookies(fetchResponse: NodeFetchResponse, expressResponse: Response) {
  const cookies = setCookie.parse(fetchResponse.headers.raw()['set-cookie'], {
    decodeValues: true,
  });
  cookies.forEach(({ name, value, expires }) => {
    expressResponse.cookie(name, value, { expires });
  });
}
