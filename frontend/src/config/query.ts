import { gql } from '@apollo/client';

const categoryQuery = {
    getAll: gql`
    query {
        categories: getAllCategories {
            id
            name
            dateCreated
            tasks {
                id
                name
                dateStart
                dateEnd
                description
            }
        }
    }`
}

export {
    categoryQuery,
}