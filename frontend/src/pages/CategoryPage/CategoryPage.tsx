import { FC } from 'react';

import { CategoryList } from '../../components';
import css from './CategoryPage.module.css';

const CategoryPage:FC = () => {
  return (
    <div  className={css.categoryPage}>
      <CategoryList/>
    </div>
    );
}

export {
  CategoryPage,
}