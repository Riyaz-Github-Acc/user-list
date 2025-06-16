import { Form, Input, Modal } from 'antd';

import type { UserModalProps } from '../../types/user';

const UserModal = ({
    isModalOpen,
    setIsModalOpen,
    handleConfirm,
    selectedUser = null,
    modalMode,
}: UserModalProps) => {
    const [form] = Form.useForm();

    const handleAfterOpenChange = (open: boolean) => {
        if (open && selectedUser && modalMode === 'edit') {
            form.setFieldsValue({
                first_name: selectedUser?.first_name || '',
                last_name: selectedUser?.last_name || '',
                email: selectedUser?.email || '',
                avatar: selectedUser?.avatar || '',
            });
        } else if (open && modalMode === 'create') {
            form.resetFields();
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (values) {
                handleConfirm(values);
                setIsModalOpen(false);
                form.resetFields();
            }
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isModalOpen}
            title={modalMode === 'edit' ? 'Edit User' : 'Create User'}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={modalMode === 'edit' ? 'Save Changes' : 'Create'}
            afterOpenChange={handleAfterOpenChange}
            centered
        >
            <Form form={form} layout="vertical" autoComplete="off" preserve={false}>
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[
                        { required: true, message: 'Please enter first name' },
                        { type: 'string', warningOnly: true },
                        { type: 'string', min: 1 },
                    ]}
                >
                    <Input placeholder="Please enter first name" />
                </Form.Item>

                <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[
                        { required: true, message: 'Please enter last name' },
                        { type: 'string', warningOnly: true },
                        { type: 'string', min: 1 },
                    ]}
                >
                    <Input placeholder="Please enter last name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input placeholder="Please enter email" />
                </Form.Item>

                <Form.Item
                    name="avatar"
                    label="Profile Picture URL"
                    rules={[
                        { required: true, message: 'Please enter profile image link' },
                        { type: 'url', message: 'Please enter a valid URL' },
                    ]}
                >
                    <Input placeholder="Please enter profile image link" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
