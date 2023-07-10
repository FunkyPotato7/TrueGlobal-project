import { ITask } from './task.interface';

export interface ICategory {
  id: number,
  name: string,
  dateCreated: string,
  tasks: [ITask]
}

export interface IEditCategory {
  id: number,
  name: string,
}
