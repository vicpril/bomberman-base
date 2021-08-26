import { Request, Response } from 'express';
import { checkIsAuth } from 'server/services/AuthCheckService';
import { ThemesService } from 'server/services/ThemesService';
import { UsersService } from 'server/services/UsersService';

export class ThemesController {
    public static getAll = async (request: Request, response: Response) => {
      try {
        const res = await ThemesService.getAllSiteThemes();
        response
          .status(200)
          .send(res);
      } catch (error) {
        response
          .status(500)
          .send(error);
      }
    }

    public static setMyTheme = async (request: Request, response: Response) => {
      if (!checkIsAuth(request)) {
        response
          .status(401)
          .send('unauthorized');
      }

      try {
        const { id } = await UsersService.getUserDataFromYandex(request);
        const { themeId } = request.body;

        if (themeId !== 1 && themeId !== 2) {
          throw new Error('Incorrect themeId value');
        }

        const responseData = await ThemesService.updateUserTheme(id, themeId);
        response
          .status(200)
          .send(responseData);
      } catch (error) {
        response
          .status(500)
          .send(error);
      }
    }

    public static getMyTheme = async (request: Request, response: Response) => {
      if (!checkIsAuth(request)) {
        response
          .status(401)
          .send('unauthorized');
      }

      try {
        const { id, name } = await UsersService.getUserDataFromYandex(request);

        const userInDB = await UsersService.getUserById(id);

        if (!userInDB) {
          await UsersService.create({
            id,
            name,
          });
        }

        const responseData = await ThemesService.findUserTheme(id);

        response
          .status(200)
          .send(responseData);
      } catch (error) {
        response
          .status(500)
          .send(error);
      }
    }
}
