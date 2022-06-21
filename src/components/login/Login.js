import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Button, TextField, Stack, Link, FormControl } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authProvider"
import { endAdornment } from '../../utils/eyeToggle';
import GoogleButton from "../googleButton";
import EntryPage from "../entryPage/entryPage";
import { loginValidationSchema } from "../../utils/validationSchemas";
const LOGIN_USER = gql`
mutation loginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
            ... on User {
            token
            }
            ... on Error {
            statusCode
            message
            }
        }
    }
`
const GoToRegister = () => {
    const navigate = useNavigate();
    return (
        <Link onClick={() => navigate('/register')}>
            Sign Up
        </Link>
    )
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginUser, { error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate();
    const { login } = useAuth();
    localStorage.setItem('token', "");

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            await loginUser({
                variables: {
                    loginInput: {
                        email: values.email,
                        password: values.password,
                        rememberMe: null
                    }
                },
                fetchPolicy: "no-cache"
            }).then(({ data }) => {
                console.log(data)
                const { token } = data.loginUser;
                if (token) {
                    localStorage.setItem('token', token);
                    login();
                    navigate('/calendar');
                }
            });
        }
    });
    console.log(error)
    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <EntryPage title={'Login'}>
            <form
             className="form" onSubmit={formik.handleSubmit}
             >
                <Stack
                    spacing={5}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 500 },
                    }}
                >
                    <TextField
                        id="email"
                        name="email"
                        type="text"
                        variant="standard"
                        label="email"
                        value={formik.values.email}
                        error={formik.errors.email}
                        helperText ={formik.errors.email}
                        onChange={formik.handleChange}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="password"
                        value={formik.values.password}
                        error={formik.errors.password}
                        helperText ={formik.errors.password}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={
                            endAdornment(showPassword, handleClickShowPassword)
                        }
                    />
                    
                    <Button type="submit" variant="contained" fullWidth> Login </Button>
                    <GoogleButton />
                    <GoToRegister />
                </Stack>
                {error && <p color="red">{error.toString()}</p>}
            </form>
        </EntryPage>
    )
};

export default Login;