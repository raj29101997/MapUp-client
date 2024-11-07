import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './authentication.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_URL;

const Login = () => {
    const navigate = useNavigate();
    const handleFinish = async (values) => {
        try {
            const obj = {
                body: values
            }
            const response = await axios.post(`${url}/auth/login`, obj);
            if (response.data.status === 201) {
                message.success('Login successful');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.roleAndAccess.role);
                localStorage.setItem('userData', JSON.stringify(response.data.roleAndAccess));
                navigate('/dashboard');
            }
        } catch (error) {
            message.error('Please check your email and password.');
        };
    };

    const handleFinishFailed = (errorInfo) => {
        message.error('Please check your email and password.');
    };

    return (
        <div className='main'>
            <Form
                layout="vertical"
                name="login"
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
                className="auth-form"
            >
                <h1>Login</h1>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>

                    <Link to='/register'>Didn't signed up yet ? </Link>

                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;