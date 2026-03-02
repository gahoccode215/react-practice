import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from "@/services/api";
import type { FormProps } from 'antd';
import { App, Button, Checkbox, Divider, Form, Input } from 'antd';
import { useCurrentApp } from "@/components/context/app.context";

type FieldType = {
    username: string;
    password: string;
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false)
    const { message, notification } = App.useApp()
    const { setIsAuthenticated, setUser } = useCurrentApp();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);

        const res = await loginAPI(username, password)
        if (res?.data) {
            setIsAuthenticated(true)
            setUser(res.data.user)
            localStorage.setItem('access_token', res.data.access_token)
            message.success("Đăng nhập thành công")
            navigate("/")
        } else {
            notification.error({
                message: "Có lỗi",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }

        setIsSubmit(false)
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className='heading'>
                    <h2>Đăng nhập</h2>
                    <Divider />
                </div>
                <Form
                    name="form-register"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="username"
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

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <Divider>Hoặc</Divider>
                    <p>Chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link></p>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage;