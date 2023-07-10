import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
    CategoryPage,
    CreateTaskPage,
    EditTaskPage,
    LoginPage,
    NotFoundPage,
    RegisterPage,
    TaskPage
} from './pages';
import { MainLayout, UnauthorizedLayout } from './layouts';
import { AutoRedirect, RequireAuth } from './hoc';

const App:FC = () => {
    return (
      <Routes>
        <Route path={'/'} element={
         <AutoRedirect>
            <UnauthorizedLayout/>
          </AutoRedirect>
        }>
          <Route index element={<Navigate to={'/login'}/>}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
        </Route>
          <Route path={'/'} element={
            <RequireAuth>
              <MainLayout/>
            </RequireAuth>
          }>
              <Route index element={<Navigate to={'/categories'}/>}/>
              <Route path={'/categories'} element={<CategoryPage/>}/>
              <Route path={'/tasks'} element={<TaskPage/>}/>
              <Route path={'/tasks/create'} element={<CreateTaskPage/>}/>
              <Route path={'/tasks/edit'} element={<EditTaskPage/>}/>
          </Route>
          <Route path={'*'} element={<NotFoundPage/>}/>
      </Routes>
    );
}

export default App;
