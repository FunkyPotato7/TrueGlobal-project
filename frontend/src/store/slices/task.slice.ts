import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GraphQLError } from 'graphql/error';

import { ICategory, INewTask, ITask, IUpdateTask } from '../../interfaces';
import { TaskService } from '../../services';

interface IState {
    tasks: ITask[]
    category: ICategory | null
    currentTask: ITask | null
    isRefreshed: boolean
}

const initialState: IState = {
    tasks: [],
    category: null,
    currentTask: null,
    isRefreshed: true,
}

const createTask = createAsyncThunk<ITask, { input: INewTask}>(
    'taskSlice/createTask',
    async ({ input }, { rejectWithValue }) => {
        try {
            const { data } = await TaskService.create(input);
            return data.task;
        } catch (e) {
            const err = e as GraphQLError;
            return rejectWithValue(err.message);
        }
    }
);

const updateTask = createAsyncThunk<ITask, { input: IUpdateTask}>(
    'taskSlice/updateTask',
    async ({ input }, { rejectWithValue }) => {
        try {
            const { data } = await TaskService.update(input);
            return data.task;
        } catch (e) {
            const err = e as GraphQLError;
            return rejectWithValue(err.message);
        }
    }
);

const deleteTask = createAsyncThunk<ICategory, { id: number }>(
    'taskSlice/deleteTask',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await TaskService.delete(id);
            return data.task;
        } catch (e) {
            const err = e as GraphQLError;
            return rejectWithValue(err.message);
        }
    }
);

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        getTasks: (state, action) => {
            state.tasks = [...action.payload.tasks].reverse();
            state.category = action.payload.category
            state.isRefreshed = false
        },
        getCurrentTask: (state, action) => {
            state.currentTask = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return { ...task, ...action.payload }
                    }
                    return task;
                })
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
            })
    }
});

const { reducer: taskReducer, actions: { getCurrentTask, getTasks } } = taskSlice;

const taskActions = {
    getTasks,
    getCurrentTask,
    createTask,
    updateTask,
    deleteTask,
}

export {
    taskActions,
    taskReducer,
}