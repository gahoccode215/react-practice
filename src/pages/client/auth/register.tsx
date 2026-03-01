import { loginAPI, registerAPI } from '@/services/api';
import type { FormProps } from 'antd';
import { App, Button, Checkbox, Divider, Form, Input } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
    fullName: string;
    password: string;
    email: string;
    phone: string;
};

const RegisterPage = () => {

    const [isSubmit, setIsSubmit] = useState(false);
    const { message } = App.useApp();
    const navigate = useNavigate();
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { email, fullName, password, phone } = values;
        console.log(values)
        const res = await registerAPI(fullName, email, password, phone)
        if (res.data) {
            message.success("Đăng ký thành công")
            navigate("/login")
        } else {
            message.error(res.message)
        }

        setIsSubmit(false)
    };

    return (
        <>
            <div className='register-page'>
                <div className='container'>
                    <div className='heading'>
                        <h2>Đăng ký tài khoản</h2>
                        <Divider />
                    </div>
                    <Form
                        name="form-register"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            labelCol={{ span: 24 }}
                            label="Họ và tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            labelCol={{ span: 24 }}
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType>
                            labelCol={{ span: 24 }}
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit" loading={isSubmit}>
                                Đăng ký
                            </Button>
                        </Form.Item>
                        <Divider>Hoặc</Divider>
                        <p>Đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link></p>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;