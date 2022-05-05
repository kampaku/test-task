import type { User } from '../types/types';

class Api {
  url: string;

  constructor() {
    this.url = 'https://jsonplaceholder.typicode.com/users';
  }

  getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(this.url);
    const users = await response.json();
    return users;
  };

  getUser = async (id: string): Promise<User> => {
    const response = await fetch(`${this.url}/${id}`);
    const user = await response.json();
    return user;
  };
}

export default Api;
