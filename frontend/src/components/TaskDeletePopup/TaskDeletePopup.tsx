import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

import { taskActions } from '../../store';
import { useAppDispatch } from '../../hooks';
import css from './TaskDeletePopup.module.css';

interface IProps {
    id: number,
    open: boolean,
    handleOpenDelete: () => void
}

const TaskDeletePopup:FC<IProps> = ({ open, handleOpenDelete, id }) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(taskActions.deleteTask({ id }));
        handleOpenDelete();
    }

    return(
        <Dialog
            open={open}
            onClose={handleOpenDelete}
        >
            <div className={css.dialog}>
                <Typography variant='h6' sx={{ marginBottom: '50px', marginTop: '20px' }}>
                    Do you want delete this task?
                </Typography>
                <div className={css.buttons}>
                    <Button onClick={handleOpenDelete}>No</Button>
                    <Button onClick={handleDelete} >Yes</Button>
                </div>
            </div>
        </Dialog>
    );
}

export {
    TaskDeletePopup,
}