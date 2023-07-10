export interface ITask {
  id: number,
  name: string,
  description: string,
  dateStart: string,
  dateEnd: string
}

export interface INewTask {
  name: string,
  description: string,
  dateStart: string,
  dateEnd: string,
  categoryId: number | undefined
}

export interface IUpdateTask {
  id: number | undefined,
  name: string | undefined,
  description: string | undefined,
  dateStart: string | undefined,
  dateEnd: string | undefined
}