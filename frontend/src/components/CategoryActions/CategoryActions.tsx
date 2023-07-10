import React, {FC, useState} from 'react';
import { Menu, MenuItem } from '@mui/material';

import { CategoryDeletePopup } from '../CategoryDeletePopup/CategoryDeletePopup';
import { CategoryEditPopup } from '../CategoryEditPopup/CategoryEditPopup';

interface IProps {
    id: number
    name: string
    open: boolean
    anchorEl: HTMLElement | null
    handleClose: () => void
}

const CategoryActions:FC<IProps> = ({ id, name, open, anchorEl, handleClose }) => {
    const [openDelete, SetOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleEdit = () => {
        setOpenEdit(!openEdit);
    }

    const handleDelete = () => {
        SetOpenDelete(!openDelete);
    }

    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>edit</MenuItem>
                <MenuItem onClick={handleDelete}>delete</MenuItem>
            </Menu>
            <CategoryDeletePopup id={id} open={openDelete} handleOpenDelete={handleDelete}/>
            <CategoryEditPopup id={id} name={name} open={openEdit} handleOpenEdit={handleEdit}/>
        </div>
    );
}

export {
    CategoryActions,
}