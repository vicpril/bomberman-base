/* eslint-disable no-console */
import { Request, Response } from 'express';
import { getCookieFromRequest, setCookies } from 'server/utils';
import fetch, { RequestInit } from 'node-fetch';

const yandexApiBaseUrl = 'https://ya-praktikum.tech/api/v2';

export class YandexAPiController {
  public static async redirectRequest(req: Request, res: Response) {
    const requestOptions: RequestInit = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...getCookieFromRequest(req),
      },
    };

    if (req.method === 'POST' || req.method === 'PUT') {
      requestOptions.body = JSON.stringify(req.body);
    }

    if (req.url.startsWith('/resources')) {
      const responseFromYandex = await fetch(`${yandexApiBaseUrl}${req.url}`, requestOptions);
      const responseFromYandexData = await responseFromYandex.buffer();
      res.status(responseFromYandex.status).send(responseFromYandexData);

      return;
    }

    const responseFromYandex = await fetch(`${yandexApiBaseUrl}${req.url}`, requestOptions);
    const responseFromYandexData = await responseFromYandex.text();

    setCookies(responseFromYandex, res);

    res.status(responseFromYandex.status).send(responseFromYandexData);
  }
}
