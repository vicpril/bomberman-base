import { Request, Response } from 'express';
import { RESPONSE_WRONG_REQUEST_DATA_TEXT } from 'server/config';
import { CreateThemeRequest, ThemesService } from 'server/services/ThemesService';
import { is } from 'typescript-is';

export class ThemesController {
    public static create = async (request: Request, response: Response) => {
      const { body } = request;
      if (!body || !is<CreateThemeRequest>(body)) {
        response
          .status(400)
          .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
        return;
      }

      try {
        const res = await ThemesService.create(body);
        response
          .status(200)
          .send(res);
      } catch (error) {
        response
          .status(500)
          .send(error);
      }
    }

    public static findOne = async (request: Request, response: Response) => {
      try {
        const res = await ThemesService.findOne(request.params.themeId);
        response
          .status(200)
          .send(res);
      } catch (error) {
        response
          .status(500)
          .send(error);
      }
    }

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
}
