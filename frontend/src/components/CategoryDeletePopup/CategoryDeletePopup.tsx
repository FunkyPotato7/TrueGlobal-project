import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Typography } from '@mui/material';

import { useAppDispatch } from '../../hooks';
import { categoryActions } from '../../store';
import css from './CategoryDeletePopup.module.css';

interface IProps {
  id: number,
  open: boolean,
  handleOpenDelete: () => void
}

const CategoryDeletePopup:FC<IProps> = ({ open, handleOpenDelete, id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
      dispatch(categoryActions.deleteCategory({ id }));
      handleOpenDelete();
  }

  return (
    <Dialog
      open={open}
      onClose={handleOpenDelete}
    >
      <div className={css.dialog}>
        <Typography variant='h6' sx={{ marginBottom: '50px', marginTop: '20px' }}>
          Do you want delete this category?
        </Typography>
        <div className={css.buttons}>
          <Button onClick={handleOpenDelete}>No</Button>
          <Button onClick={handleDelete} >Yes</Button>
        </div>
      </div>
    </Dialog>
  )
}

export {
  CategoryDeletePopup,
}