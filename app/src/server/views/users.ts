import { User } from 'server/models/User';

export const getUsers = async (request: any, response: any) => {
  const users = await User.findAll();
  response.status(200).json(JSON.stringify(users));
};
