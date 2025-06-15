import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import bgImage from '../utils/bg.jpeg';
import logoImage from '../utils/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post('http://localhost:8080/api/v1/users/login', values);
            setLoading(false);
            localStorage.setItem("user", JSON.stringify({ ...data.user, password: '' }));
            navigate('/home');
            message.success("Login successful");
        } catch (error) {
            setLoading(false);
            message.error('something went error');
        }
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center mt-3 gap-2'>
                <img src={logoImage} alt="" style={{ width: '90px', height: '70px' }}/>
                <h3 className='text-align-center fs-1 text-primary my-9'>BUDGET BOSS</h3>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className="img-container">
                    <img src={bgImage} alt="" />
                </div>
                <div className="register-page">
                    {loading && <Spinner />}
                    <Form layout='vertical' onFinish={submitHandler}>
                        <h1 className='text-align-center fs-1 text-primary'>LOGIN FORM</h1>
                        <Form.Item label="Email" name="email">
                            <Input type="email" required />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type="password" required />
                        </Form.Item>
                        <div className="d-flex flex-column gap-2">
                            <Link to="/register">Don't have an account? Click here to register</Link>
                            <button className='btn btn-primary '>Login</button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login