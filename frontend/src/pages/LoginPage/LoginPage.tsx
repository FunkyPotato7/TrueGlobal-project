import { FC, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { Button, Link, Typography } from '@mui/material';
import { TextField } from 'formik-material-ui';

import { AuthService } from '../../services';
import { authSchema } from '../../validators';
import css from './LoginPage.module.css'

const LoginPage:FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<ApolloError | null>();

  const login = async (email: string, password: string) => {
    try {
      const { data }  = await AuthService.login(email, password);
      AuthService.setToken(data.login.access_token);
      navigate('/categories');
    } catch (error: any) {
      error.graphQLErrors.map((error: ApolloError) => setApiError(error));
    }
  }

  return (
    <div className={css.loginPage}>
      <Typography variant='h4' sx={{
        position: "relative",
        top: "-16%",
        backgroundColor: "white",
        height: "30px",
        width: "100px",
        textAlign: "center",
        color: "#1976d2",
      }}>Login</Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={authSchema}
        onSubmit={({ email, password }, { setSubmitting }) => {
          login(email, password);
          setSubmitting(false);
        }}>
        {({ errors, touched, setTouched }) =>
         <Form className={css.form}>
             <Field
               component={TextField}
               name="email"
               label="Email"
               variant="outlined"
               error={ !!apiError?.message || (errors.email && touched.email) }
               sx={{ width: "100%", height: "90px" }}
               onBlur={() => {
                 setTouched({ email: false });
                 setApiError(null);
               }}
             />
             <Field
               component={TextField}
               type="password"
               name="password"
               label="Password"
               variant="outlined"
               error={ !!apiError?.message || (errors.password && touched.password) }
               helperText={ apiError?.message }
               sx={{ width: "100%", height: "90px" }}
               onBlur={() => {
                 setTouched({ password: false });
                 setApiError(null);
               }}
             />
             <Button type="submit" variant="outlined" sx={{ margin: "10px", width: "200px" }}>
               Login
             </Button>
             <Link href={"register"} underline="hover">Need to create account?</Link>
        </Form>}
      </Formik>
    </div>
  );
}

export {
  LoginPage,
}
