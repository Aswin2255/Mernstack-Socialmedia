import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const signupSchema = Yup.object({
  Username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username must be at most 15 characters')
    .required('Username is required'),
  Email: Yup.string().email('Invalid email').required('Email is required'),
  Phone: Yup.string()
    .matches(/^[789]\d{9}$/, 'Invalid phone number')
    .required('Phone number is required'),
  Password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('Password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
