import { gql } from '@apollo/client';

const authMutation = {
  login: gql`
  mutation login($input: LoginUserDto!) {
      login(loginUserDto: $input) {
          user {
              id
              email
              role
          }
          access_token
      }
  }`,

  register: gql`
  mutation register($input: LoginUserDto!) {
      register(registerUserDto: $input) {
          id
          email
          role
      }
  }`
};

const categoryMutation = {
  create: gql`
    mutation createCategory($name: String!) {
        category: createCategory(name: $name) {
            id
            name
            dateCreated
            tasks {
                id
                name
                description
                dateStart
                dateEnd
            }
        }
    }`,

  update: gql`
    mutation updateCategory($input: UpdateCategoryDto!) {
        category: updateCategory(updateCategoryDto: $input) {
            id
            name
            dateCreated
        }
    }`,

  delete: gql`
  mutation deleteCategory($id: Float!) {
      category: deleteCategory(id: $id) {
          id
          name
          dateCreated
      }
  }`
};

const taskMutation = {
  create: gql`
      mutation createTask($input: CreateTaskDto!) {
          task: createTask(createTaskDto: $input) {
              id
              name
              description
              dateStart
              dateEnd
          }
      }`,
  update: gql`
  mutation updateTask($input: UpdateTaskDto!) {
      task: updateTask(updateTaskDto: $input) {
          id
          name
          description
          dateStart
          dateEnd
      }
  }`,
  delete: gql`
      mutation deleteTask($id: Float!) {
          task: deleteTask(id: $id) {
              id
              name
              description
              dateStart
              dateEnd
          }
      }`,
}

export {
  categoryMutation,
  taskMutation,
  authMutation,
};
