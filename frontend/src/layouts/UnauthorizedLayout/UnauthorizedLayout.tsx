import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const UnauthorizedLayout:FC = () => {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Outlet/>
      </div>
    );
}

export {
    UnauthorizedLayout,
}