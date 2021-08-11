import { SiteTheme } from 'server/models/SiteTheme';
import { BaseRESTService } from './BaseRESTService';

export type CreateThemeRequest = {
    name: string;
    description: string;
}

export class ThemesService implements BaseRESTService {
    public static create = (data: CreateThemeRequest) => SiteTheme.create(data);

    public static findOne = (id: string) => SiteTheme.findByPk(id);

    public static getAllSiteThemes = () => SiteTheme.findAll();
}
