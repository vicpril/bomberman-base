import { User } from 'server/models/User';
import { BaseRESTService } from './BaseRESTService';

export class UsersService implements BaseRESTService {
    public static getAllUsers = () => User.findAll();

    public static create = (args: {name: string}) => User.create(args)
}
