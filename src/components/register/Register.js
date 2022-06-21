import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField, Stack, Link } from "@mui/material";
import { endAdornment } from '../../utils/eyeToggle';
import EntryPage from '../entryPage/entryPage';

const GoToLogin = () => {
    const navigate = useNavigate();
    return (
        <Link onClick={() => navigate('/login')}>
            Sign In
        </Link>
    )
}

const Register = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setValues((prevValues) => ({
            ...prevValues,
            showPassword: !values.showPassword,
        }));
    };
    const handleChange = (prop) => (event) => {
        setValues((prevValues) => ({ ...prevValues, [prop]: event.target.value }));
    };

    return (
        <EntryPage title={"Register"} >
            <form>
                <Stack
                    spacing={5}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 500 },
                    }}
                >
                    <TextField
                        variant="standard"
                        label="Firstname"
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        label="Lastname"
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        label="Email"
                        value={values.email}
                        onChange={handleChange('email')}
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        type={values.showPassword ? "text" : "password"}
                        label="Password"
                        value={values.password}
                        onChange={handleChange('password')}
                        fullWidth
                        InputProps={
                            endAdornment(values.showPassword, handleClickShowPassword)
                        }
                    />
                    <TextField
                        variant="standard"
                        type={values.showPassword ? "text" : "password"}
                        label="Repeat password"
                        value={values.repeatPassword}
                        onChange={handleChange('repeatPassword')}
                        fullWidth
                        InputProps={
                            endAdornment(values.showPassword, handleClickShowPassword)
                        }
                    />
                    <Button type="submit" variant="contained" fullWidth> Register </Button>
                </Stack>
            </form>
            <GoToLogin />
        </EntryPage>
    )
}

export default Register;