import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { useAppDispatch } from '../../hooks';
import { categoryActions } from '../../store';
import css from './CategoryEditPopup.module.css';

interface IProps {
  id: number,
  name: string,
  open: boolean,
  handleOpenEdit: () => void
}

const CategoryEditPopup:FC<IProps> = ({ id, open, handleOpenEdit, name }) => {
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={open}
      onClose={handleOpenEdit}
    >
      <Formik
          initialValues={{
            name: name,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
                .min(2, 'Name must be minimum 2 chars')
                .max(20, 'Name must be less than 20 chars')
                .required()
          })}
          onSubmit={({ name }) => {
            dispatch(categoryActions.updateCategory({ id, name }));
            handleOpenEdit()
          }}
      >
        <Form className={css.form}>
          <Typography>Create new category</Typography>
          <Field
              component={TextField}
              name="name"
              label="Name"
              variant="outlined"
              sx={{ width: "100%" }}
          />
          <div className={css.buttons}>
            <Button variant="outlined" sx={{ width: "90px" }} onClick={handleOpenEdit}>cancel</Button>
            <Button variant="outlined" sx={{ width: "90px" }} type="submit">save</Button>
          </div>
        </Form>
      </Formik>
    </Dialog>
  )
}

export {
  CategoryEditPopup,
}