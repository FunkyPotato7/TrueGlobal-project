import React, { FC, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent } from '@mui/material';
import format from 'date-fns/format';

import { CategoryActions } from '../CategoryActions/CategoryActions';
import { ICategory } from '../../interfaces';
import { useAppDispatch } from '../../hooks';
import { taskActions } from '../../store';

interface IProps {
  category: ICategory,
  children?: ReactNode,
}

const CategoryItem:FC<IProps> = ({ category }) => {
  const { id, name, dateCreated, tasks } = category;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openTasks = () => {
    dispatch(taskActions.getTasks({ tasks, category }));
    navigate('/tasks');
  }

  return (
    <Card variant="outlined" sx={{ margin: '20px 0 20px 0', width: '100%' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '500px' }}>
          <h2>{name}</h2>
          <h4>{tasks.length} tasks</h4>
          <h4>{format(new Date(dateCreated), 'dd.MM.yyyy')}</h4>
        </div>

        <div>
          <Button sx={{ width: "100px" }} onClick={handleClick}>actions</Button>
          <Button sx={{ width: "100px" }} onClick={openTasks}>more</Button>
          <CategoryActions
            id={id}
            name={name}
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </div>
      </CardContent>
    </Card>
  );
}


export {
  CategoryItem,
};