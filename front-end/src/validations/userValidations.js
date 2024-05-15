import * as Yup from 'yup';

export const userValidations = Yup.object().shape({
    username: Yup.string().min(3).required(),
    password: Yup.string().min(5).required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    email: Yup.string().email('Invalid email format').required(),
    profileImg: Yup.string().url('Invalid URL format').required(),
    balance: Yup.number().positive('Balance must be positive').integer('Balance must be an integer').required()
});
