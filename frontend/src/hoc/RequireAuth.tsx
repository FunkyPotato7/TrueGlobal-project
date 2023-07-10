import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthService } from '../services';

interface IProps {
    children: ReactNode
}

const RequireAuth:FC<IProps> = ({ children }) => {
    const location = useLocation();
    const access = AuthService.getToken();

    if (!access) {
        return <Navigate to={'/login'} state={location}/>
    }

    return <>{children}</>

};

export {
    RequireAuth
};