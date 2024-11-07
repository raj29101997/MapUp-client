import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import './authentication.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const url = process.env.REACT_APP_URL;

 const Register = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        roles: '',
    });

    const handleFinish = async (values) => {
        const obj = {
            body: values,
            action: 'register'
        }
        const response = await axios.post(`${url}/auth/register`, obj);
        if (response.status === 201) {
            message.success('Registration successful');
            navigate('/');
        } else {
            message.error('Registration failed');
            navigate('/register');
        }
    };

    const handleFinishFailed = (errorInfo) => {
        message.error('Please check the form fields for errors.');
    };

    return (
        <div className='main'>
            <Form
                form={form}
                layout="vertical"
                name="register"
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
                initialValues={state}
                className="auth-form"

            >
                <h1>Registration</h1>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input placeholder="Enter username" />
                </Form.Item>

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

                <Form.Item
                    label="Role"
                    name="roles"
                    rules={[{ required: true, message: 'Please select your role' }]}
                >
                    <Select placeholder="Select a role">
                        <Option value="Admin">Admin</Option>
                        <Option value="Manager">Manager</Option>
                        <Option value="User">User</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Register;