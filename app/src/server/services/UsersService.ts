import { User } from 'server/models/User';
import { getCookieFromRequest } from 'server/utils';
import { Request } from 'express';
import fetch, { RequestInit } from 'node-fetch';
import { BaseRESTService } from './BaseRESTService';
import { yandexApiBaseUrl } from '../controllers/YandexAPiController';

export class UsersService implements BaseRESTService {
    public static getAllUsers = () => User.findAll();

    public static getUserById = (id: number) => User.findByPk(id);

    public static create = (args: {name: string, id: number}) => User.create(args);

    // Ходит на апи Яндекса и получает имя и айди юзера по кукам
    public static getUserDataFromYandex = async (request: Request) => {
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...getCookieFromRequest(request),
          },
        };

        const responseFromYandex = await fetch(`${yandexApiBaseUrl}/auth/user`, requestOptions);
        const responseFromYandexData = await responseFromYandex.json();

        if (responseFromYandex.status === 200) {
          return { id: responseFromYandexData.id, name: responseFromYandexData.display_name };
        }

        throw new Error('Did not get userdata from yandex');
      } catch (error) {
        return error;
      }
    }
}
