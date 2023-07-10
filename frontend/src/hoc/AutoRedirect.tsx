import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthService } from '../services';

interface IProps {
  children: ReactNode;
}

const AutoRedirect:FC<IProps> = ({ children }) => {
  const access = AuthService.getToken();

  if (access) {
    return <Navigate to={'/categories'}/>
  }
  return <>{children}</>;
};

export {
  AutoRedirect,
}