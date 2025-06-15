import React, { useState } from 'react'
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import bgImage from '../utils/bg.jpeg';
import logoImage from '../utils/logo.png';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8080/api/v1/users/register', values);
            message.success("User registered successfully!");
            navigate('/');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error("Registration failed!");
        }
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center mt-3 gap-2'>
                <img src={logoImage} alt="" style={{ width: '90px', height: '70px' }} />
                <h3 className='text-align-center fs-1 text-primary my-9'>BUDGET BOSS</h3>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className="img-container">
                    <img src={bgImage} alt="" />
                </div>
                <div className="register-page mt-4">
                    {loading && <Spinner />}
                    <Form layout='vertical' onFinish={submitHandler}>
                        <h1 className='text-align-center fs-3 text-primary'>REGISTERATION FROM</h1>
                        <Form.Item label="Name" name="name">
                            <Input required />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input type="email" required />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type="password" required />
                        </Form.Item>
                        <div className="d-flex flex-column gap-2">
                            <Link to="/" className='fs-5'>Already registered? Click here to login</Link>
                            <button className='btn btn-primary '>Register</button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Register