import { TaskList } from '../../components';
import css from './TaskPage.module.css';

const TaskPage = () => {
  return (
  <div className={css.taskPage}>
    <TaskList/>
  </div>
  );
}

export {
  TaskPage,
}