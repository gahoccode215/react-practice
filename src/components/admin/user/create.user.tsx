import { createUserAPI } from "@/services/api";
import { App, Divider, Form, Input, Modal, type FormProps } from "antd";
import { useState } from "react";


interface IProps {
    openModalCreate: boolean;
    setOpenModalCreate: (v: boolean) => void;
    refreshTable: () => void;
}
type FieldType = {
    fullName: string;
    password: string;
    email: string;
    phone: string;
}

export const CreateUser = (props: IProps) => {
    const { openModalCreate, setOpenModalCreate, refreshTable } = props;
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const { message, notification } = App.useApp();

    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { fullName, password, email, phone } = values
        setIsSubmit(true)
        const res = await createUserAPI(fullName, email, password, phone)
        if (res && res.data) {
            message.success('Tạo mới user thành công')
            form.resetFields()
            setOpenModalCreate(false)
            refreshTable();
        } else {
            notification.error({
                message: 'Lỗi',
                description: res.message
            })
        }
        setIsSubmit(false)
    }

    return (
        <Modal
            title="Thêm mới người dùng"
            open={openModalCreate}
            onOk={() => { form.submit() }}
            onCancel={() => {
                setOpenModalCreate(false)
                form.resetFields()
            }}
            confirmLoading={isSubmit}
            cancelText={"Hủy"}
        >
            <Divider />
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                style={{ maxWidth: 600 }}
                form={form}
            >
                <Form.Item<FieldType>
                    labelCol={{ span: 24 }}
                    label="Tên hiển thị"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
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
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Email không được để trống!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    labelCol={{ span: 24 }}
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Phone không được để trống!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>

        </Modal>
    )
}