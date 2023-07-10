import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthService } from '../../services';
import css from './Header.module.css';

const Header:FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        AuthService.deleteToken();
        navigate('/login');
    }

    return (
       <div className={css.header}>
           <Typography variant="h5" sx={{ marginLeft: "50px" }}>TrueGlobal</Typography>
           <div className={css.buttons}>
               {location.pathname.includes('tasks') && <Button
                   variant="contained"
                   sx={{backgroundColor: "orange"}}
                   onClick={() => navigate('/categories')
                   }>Back</Button>}
               <Button
                   variant="contained"
                   sx={{ backgroundColor: "orange", marginLeft: "20px" }}
                   onClick={logout}
               >Logout</Button>
           </div>
       </div>
    );
}

export {
    Header,
}