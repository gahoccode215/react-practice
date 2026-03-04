import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Table, type UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";

interface IProps {
    openModalImport: boolean;
    setOpenModalImport: (v: boolean) => void;
}

export const ImportUser = (props: IProps) => {
    const { setOpenModalImport, openModalImport } = props

    const propsUpload: UploadProps = {
        name: 'file',
        multiple: true,
        maxCount: 1,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",

        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',

        customRequest({ file, onSuccess }) {
            setTimeout(() => {
                if (onSuccess) onSuccess("ok")
            }, 1000)
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <Modal
                title="Import data user"
                width={"50vw"}
                open={openModalImport}
                onOk={() => setOpenModalImport(false)}
                onCancel={() => setOpenModalImport(false)}
                okButtonProps={{
                    disabled: true
                }}
                maskClosable={false}
            >
                <Dragger {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                <div style={{ paddingTop: 20 }}>
                    <Table
                        title={() => <span>Dữ liệu upload:</span>}
                        columns={[
                            { dataIndex: 'fullName', title: 'Tên' },
                            { dataIndex: 'email', title: 'Email' },
                            { dataIndex: 'phone', title: 'Phone' }
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}