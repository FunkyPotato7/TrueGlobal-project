import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GraphQLError } from 'graphql/error';

import { ICategory } from '../../interfaces';
import { CategoryService } from '../../services';

interface IState {
  categories: ICategory[],
  deletedCategory: ICategory | null,
}

const initialState: IState = {
  categories: [],
  deletedCategory: null
};

const getAll = createAsyncThunk<ICategory[], void>(
  'categorySlice/getAll',
  async (_,{ rejectWithValue }) => {
    try {
      const { data } = await CategoryService.getAll();
      return data.categories;
    } catch (e) {
      const err = e as GraphQLError
      return rejectWithValue(err.message);
    }
  }
);

const createCategory = createAsyncThunk<ICategory, { name: string }>(
  'categorySlice/createCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      const { data } = await CategoryService.create(name);
      return data.category;
    } catch (e) {
      const err = e as GraphQLError;
      return rejectWithValue(err.message);
    }
  }
);

const updateCategory = createAsyncThunk<ICategory, { id: number, name: string } >(
  'categorySlice/updateCategory',
  async ({ id, name }, { rejectWithValue }) => {
    try {
        const { data } = await CategoryService.update({id, name});
        console.log(data);
        return data.category;
    } catch (e) {
      const err = e as GraphQLError;
      return rejectWithValue(err.message);
    }
  }
);

const deleteCategory = createAsyncThunk<ICategory, { id: number }>(
  'categorySlice/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await CategoryService.delete(id);
      return data.category;
    } catch (e) {
      const err = e as GraphQLError;
      return rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map(category => {
          if (category.id === action.payload.id) {
            return { ...category, ...action.payload }
          }
          return category;
        })
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deletedCategory = action.payload
        state.categories = state.categories.filter(category => category.id !== action.payload.id)
      })
  }
});


const { reducer:categoryReducer } = categorySlice;

const categoryActions = {
  getAll,
  createCategory,
  updateCategory,
  deleteCategory,
}

export {
  categoryActions,
  categoryReducer,
}
