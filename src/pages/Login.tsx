import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import useIsMobile from '../hooks/useIsMobile';
import { loginUser } from '../store/actions/auth.action';
import type { AppDispatch, RootState } from '../store/store';

interface FieldType {
    email: string;
    password: string;
    remember?: string;
}

const Login = () => {
    const [form] = Form.useForm<FieldType>();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, token } = useSelector((state: RootState) => state.auth);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (token) {
            navigate('/user-list');
        }
    }, [token, navigate]);

    const validateForm = useCallback(() => {
        const fieldsError = form.getFieldsError();
        const hasErrors = fieldsError.some(({ errors }) => errors.length > 0);
        const values = form.getFieldsValue(['email', 'password']);
        const allFilled = values.email && values.password;
        setIsFormValid(!hasErrors && allFilled);
    }, [form]);

    useEffect(() => {
        validateForm();
    }, [form, validateForm]);

    const onFieldsChange = () => {
        validateForm();
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        dispatch(loginUser(values));
    };

    return (
        <Form
            form={form}
            name="basic"
            layout="vertical"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                margin: isMobile ? '0px 15px' : '0px 30px',
            }}
            initialValues={{
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
                remember: true,
            }}
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
            autoComplete="off"
        >
            <div
                style={{
                    background: '#fff',
                    padding: 24,
                    borderRadius: 8,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Form.Item<FieldType>
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email id' },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="User Name" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={!isFormValid || loading}
                    >
                        Login
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default Login;
