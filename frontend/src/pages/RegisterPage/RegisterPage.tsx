import { FC, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, Link, Typography } from '@mui/material';

import { AuthService } from '../../services';
import { authSchema } from '../../validators';
import css from './RegisterPage.module.css';

const RegisterPage:FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<ApolloError | null>();

  const register = async (email: string, password: string) => {
    try {
      await AuthService.register(email, password);
      navigate('/login');
    } catch (error: any) {
      error.graphQLErrors.map((error: ApolloError) => setApiError(error));
    }
  }

  return (
    <div className={css.registerPage}>
      <Typography variant='h4' sx={
        { position: "relative",
          top: "-16%",
          right: "-54%",
          backgroundColor: "white",
          width: "140px",
          height: "30px",
          textAlign: "center",
          color: "#1976d2",
        }}>Register</Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={authSchema}
        onSubmit={({ email, password }, { setSubmitting }) => {
          register(email, password);
          setSubmitting(false);
        }}>
        {({ errors, touched, setTouched }) =>
          <Form className={css.form}>
            <Field
              component={TextField}
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              error={ !!apiError?.message || (errors.email && touched.email) }
              helperText={ apiError?.message }
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
              error={ errors.password && touched.password }
              sx={{ width: "100%", height: "90px" }}
              onBlur={() => {
                setTouched({ password: false });
                setApiError(null);
              }}
            />
            <Button type="submit" variant="outlined" sx={{ margin: "10px", width: "200px" }}>
              Register
            </Button>
            <Link href={"login"} underline="hover">Back to login</Link>
          </Form>}
      </Formik>
    </div>
  );
}

export {
  RegisterPage,
}
