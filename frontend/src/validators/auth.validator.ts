import * as Yup from 'yup';

import { regexp } from '../config';

const authSchema = Yup.object().shape({
    email: Yup.string()
        .matches(regexp.EMAIL, { message: 'Wrong email pattern' })
        .required(),
    password: Yup.string()
        .min(8, 'Password must be minimum 8 chars')
        .max(20, 'Password must be less than 20 chars')
        .required()
})

export {
    authSchema,
}