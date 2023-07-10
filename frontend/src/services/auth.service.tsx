import { client } from './apollo.service';
import { ACCESS_TOKEN, authMutation } from '../config';

const AuthService = {
  login: (email: string, password: string) => client.mutate({
    mutation: authMutation.login,
    variables: {
      input: {
        email,
        password
      }
    }
  }),
  register: (email: string, password: string) => client.mutate({
    mutation: authMutation.register,
    variables: {
      input: {
        email,
        password
      }
    }
  }),
  setToken: (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  },
  getToken: () => localStorage.getItem(ACCESS_TOKEN),
  deleteToken: () => {
    localStorage.removeItem(ACCESS_TOKEN);
  }
}

export {
  AuthService,
}
