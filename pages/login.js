import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from '../styles/Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import axios from "axios";
import ToggleNotification from "../components/ToogleNotification/ToogleNotification";
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const [trainer] = useState({
        email: '',
        password: ''
    });

    const submitHandler = async (values) => {
        try {
            let res = await axios.post(`/api/auth/login`, values);
            localStorage.setItem('token', res.data.meta.accessToken);
            localStorage.setItem('refresh-token', res.data.meta.refreshToken);
            ToggleNotification("Success Login", res.data.message);
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }
        catch (error) {
            ToggleNotification("Error", error?.response?.data?.message);
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Must be Valid Email').trim().required('Email is required'),
        password: Yup.string().trim().required('Password is required')
    });

    const formik = useFormik({
        initialValues: trainer,
        onSubmit: submitHandler,
        validationSchema: validationSchema,
        validateOnMount: true
    });

    return (
        <>
            <div className={`${styles.outline}`}>
                <Form className={`${styles.loginForm}`} onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            className={`${styles.input} mb-3`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.email && formik.errors.email ? (
                                <div className='error'>{formik.errors.email}</div>
                            ) : null
                        }
                        <Label for="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            className={`${styles.input} mb-3`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                            formik.touched.password && formik.errors.password ? (
                                <div className='error'>{formik.errors.password}</div>
                            ) : null
                        }
                        <Button type="submit" color="primary" className={`${styles.loginBtn} mb-3`}>Login</Button>
                    </FormGroup>
                </Form>
            </div>
        </>
    );
};
