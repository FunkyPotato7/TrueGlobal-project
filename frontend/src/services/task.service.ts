import { client } from './apollo.service';

import { taskMutation } from '../config';
import { INewTask, IUpdateTask } from '../interfaces';

const TaskService = {
    create: (input: INewTask) => client.mutate({
        mutation: taskMutation.create,
        variables: {
            input,
        }
    }),
    update: (input: IUpdateTask) => client.mutate({
        mutation: taskMutation.update,
        variables: {
            input,
        }
    }),
    delete: (id: number) => client.mutate({
        mutation: taskMutation.delete,
        variables: {
            id,
        }
    })
}

export {
    TaskService,
}