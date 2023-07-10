import { client } from './apollo.service';

import { categoryMutation, categoryQuery } from '../config';
import { IEditCategory } from '../interfaces';

const CategoryService = {
    getAll: () => client.query({
        query: categoryQuery.getAll,
        fetchPolicy: 'no-cache',
    }),
    create: (name: string) => client.mutate({
        mutation: categoryMutation.create,
        variables: {
            name,
        }
    }),
    update: (input: IEditCategory) => client.mutate({
        mutation: categoryMutation.update,
        variables: {
            input
        }
    }),
    delete: (id: number) => client.mutate({
        mutation: categoryMutation.delete,
        variables: {
            id,
        }
    })
}

export {
    CategoryService,
}