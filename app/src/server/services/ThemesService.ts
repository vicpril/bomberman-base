import { SiteTheme } from 'server/models/SiteTheme';
import { UserTheme } from 'server/models/UserTheme';
import { BaseRESTService } from './BaseRESTService';

export type CreateThemeRequest = {
    name: string;
    description: string;
}

export class ThemesService implements BaseRESTService {
    public static create = (data: CreateThemeRequest) => SiteTheme.findOrCreate(
      {
        where: { name: data.name },
        defaults: data,
      },
    );

    public static findUserTheme = async (id: string) => {
      let userTheme = await UserTheme.findByPk(id);

      if (!userTheme) {
        userTheme = await UserTheme.create({ ownerId: id, themeId: 1 });
      }

      return new Promise((resolve) => {
        resolve(userTheme);
      });
    }

    public static updateUserTheme = async (id: string, themeId: string) => UserTheme.upsert({ ownerId: id, themeId })

    public static getAllSiteThemes = () => SiteTheme.findAll();

    public static init = () => {
      ThemesService.create({
        name: 'light',
        description: 'light theme description',
      });
      ThemesService.create({
        name: 'dark',
        description: 'dark theme profound description',
      });
    }
}
