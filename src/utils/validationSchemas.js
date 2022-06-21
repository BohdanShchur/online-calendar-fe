import * as Yup from 'yup';
const passwordRegExp =
    /^(?=.*[A-ZА-ЯІЇЄ])(?=.*\d)[a-zA-Zа-яА-ЯіїєІЇЄ\d!@#$%^&*()~¥=_+}{":;'?/>.<,\\`|[\]-]{6,30}$/;

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(passwordRegExp, 'Password must contains at least 1 main letter and numbers')
})  