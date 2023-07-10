import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be minimum 2 chars')
    .max(15, 'Name must be less than 15 chars')
    .required(),
  description: Yup.string()
    .min(2, 'Name must be minimum 2 chars')
    .max(50, 'Name must be less than 50 chars')
    .optional(),
  dateStart: Yup.date().required(),
  dateEnd:Yup.date().required(),
});

export {
  taskSchema,
}