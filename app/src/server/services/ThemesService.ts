import { SiteTheme } from 'server/models/SiteTheme';
import { UserTheme } from 'server/models/UserTheme';
import { BaseRESTService } from './BaseRESTService';

export type CreateThemeRequest = {
    name: string;
    description: string;
}

export class ThemesService implements BaseRESTService {
    public static create = (data: CreateThemeRequest) => SiteTheme.create(data);

    public static findUserTheme = async (id: string) => {
      let userTheme = await UserTheme.findByPk(id);

      if (!userTheme) {
        userTheme = await UserTheme.create({ ownerId: id, themeId: 0 });
      }

      return new Promise((resolve) => {
        resolve(userTheme);
      });
    }

    public static updateUserTheme = async (id: string, themeId: string) => UserTheme.upsert({ ownerId: id, themeId })

    public static getAllSiteThemes = () => SiteTheme.findAll();
}
