import { Request, Response } from 'express';
import { UsersService } from 'server/services/UsersService';

export class UsersController {
    public static getAll = async (request: Request, response: Response) => {
      try {
        const res = await UsersService.getAllUsers();
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
