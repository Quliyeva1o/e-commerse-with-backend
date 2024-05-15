import * as Yup from 'yup';

export const messageValidations = Yup.object().shape({
    fullName: Yup.string().required(),
    email: Yup.string().email('Invalid email format').required(),
    title: Yup.string().required(),
    message: Yup.string().min(10).required()
});