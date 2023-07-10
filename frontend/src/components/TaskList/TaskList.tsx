import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks';
import { TaskItem } from '../TaskItem/TaskItem';
import css from './TaskList.module.css';

const TaskList:FC = () => {
  const { tasks, category, isRefreshed } = useAppSelector(state => state.taskReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRefreshed) {
      navigate('/categories');
    }
  }, [isRefreshed, navigate]);

  const openCreatePage = () => {
    navigate('/tasks/create')
  }

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <Typography variant="h4">{category?.name}</Typography>
        <Button sx={{ width: '200px' }} variant='outlined' onClick={openCreatePage}>Add task</Button>
      </div>
      <div className={css.taskList}>
        {tasks.map(task => <TaskItem key={task.id} task={task}/>)}
        {!tasks.length && <div className={css.empty}>
          <Typography variant='h5'>There is no tasks yet</Typography>
        </div>}
      </div>
    </div>
  );
}

export {
  TaskList,
}
