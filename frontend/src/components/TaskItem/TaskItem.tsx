import { FC, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from '@mui/material';
import format from 'date-fns/format';

import { ITask } from '../../interfaces';
import { TaskDeletePopup } from '../TaskDeletePopup/TaskDeletePopup';
import { useAppDispatch } from '../../hooks';
import { taskActions } from '../../store';
import css from './TaskItem.module.css';

interface IProps {
  task: ITask,
  children?: ReactNode,
}

const TaskItem:FC<IProps> = ({ task }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(taskActions.getCurrentTask(task));
    navigate('/tasks/edit')
  }

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  }

  return (
    <Card variant="outlined" sx={{ m: "50px 50px 10px 50px" }}>
      <div className={css.wrapper}>
        <div className={css.cardContent}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>{task.name}</Typography>
          <Typography sx={{ m: "10px 0 20px 0" }} >Start Date: {format(new Date(task.dateStart), 'dd.MM.yyyy')}</Typography>
          <Typography sx={{ m: "10px 0 20px 0" }}>End date: {format(new Date(task.dateEnd) ,'dd.MM.yyyy')}</Typography>
          <Typography>{task.description}</Typography>
        </div>
        <div className={css.buttons}>
          <Button variant="outlined" sx={{ width: "80px"}} onClick={handleOpenDelete}>delete</Button>
          <Button variant="outlined" sx={{ width: "80px"}} onClick={handleEdit}>edit</Button>
        </div>
        <TaskDeletePopup open={openDelete} handleOpenDelete={handleOpenDelete} id={task.id}/>
      </div>
    </Card>
  );
}

export {
  TaskItem,
}