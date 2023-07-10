import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import { Field, Form, Formik } from 'formik';
import { Button, Typography } from '@mui/material';
import { TextField } from 'formik-material-ui';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { taskSchema } from '../../validators';
import { taskActions } from '../../store';
import css from './CreateTaskPage.module.css';

const CreateTaskPage:FC = () => {
    const { category } = useAppSelector(state => state.taskReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
      <Dialog
        open={true}
      >
          <Formik
              initialValues={{
                  name: '',
                  description: '',
                  dateStart: '',
                  dateEnd: '',
                  categoryId: category?.id,
              }}
              validationSchema={taskSchema}
              onSubmit={(values) => {
                  dispatch(taskActions.createTask({input: values}));
                  navigate('/tasks');
              }}>
              <Form className={css.form}>
                  <Typography>Create new task</Typography>
                  <Field
                      component={TextField}
                      name="name"
                      label="Name"
                      variant="outlined"
                      sx={{ width: "100%", height: "75px" }}
                  />
                  <Field
                      component={TextField}
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      sx={{ width: "100%", height: "140px" }}
                  />
                  <div className={css.dateFields}>
                      <div className={css.field}>
                          <Typography>Date start:</Typography>
                          <Field
                              component={TextField}
                              name="dateStart"
                              type="date"
                              variant="outlined"
                              sx={{ width: "200px", height: "80px" }}
                          />
                      </div>
                      <div className={css.field}>
                        <Typography>End start:</Typography>
                        <Field
                            component={TextField}
                            name="dateEnd"
                             type="date"
                            variant="outlined"
                            sx={{ width: "200px", height: "80px" }}
                        />
                    </div>
                  </div>
                  <div className={css.buttons}>
                      <Button
                          sx={{ width: "90px" }}
                          variant="outlined"
                          onClick={() => navigate('/tasks')}
                      >cancel</Button>
                      <Button type="submit" sx={{ width: "90px" }} variant="outlined">save</Button>
                  </div>
              </Form>
          </Formik>
      </Dialog>
    );
}

export {
    CreateTaskPage,
}