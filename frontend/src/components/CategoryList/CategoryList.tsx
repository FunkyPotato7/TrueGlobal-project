import { FC, useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { categoryActions } from '../../store';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import css from './CategoryList.module.css';

const CategoryList:FC = () => {
    const { categories } = useAppSelector(state => state.categoryReducer);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(categoryActions.getAll());
    }, [dispatch]);

    const handleClose = () => {
        setOpen(!open);
    }

    return (
        <div className={css.wrapper}>
            <Button variant="outlined" sx={{ width: '200px' }} onClick={handleClose}>Add category</Button>
            <div className={css.categoryList}>
                {categories.map(category => <CategoryItem key={category.id} category={category}/>)}
                {!categories.length && <div className={css.empty}>
                    <Typography variant='h5'>There is no categories yet</Typography>
                </div>}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Formik
                    initialValues={{
                        name: '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .min(2, 'Name must be minimum 2 chars')
                            .max(20, 'Name must be less than 20 chars')
                            .required()
                    })}
                    onSubmit={({ name }) => {
                        dispatch(categoryActions.createCategory({ name }));
                        handleClose();
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
                            <Button variant="outlined" sx={{ width: "90px" }} onClick={handleClose}>cancel</Button>
                            <Button variant="outlined" sx={{ width: "90px" }} type="submit">save</Button>
                        </div>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export {
    CategoryList,
}