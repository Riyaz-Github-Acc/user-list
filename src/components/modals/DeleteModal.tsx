import { Modal } from 'antd';

import type { UserListDataProps, UserModalProps } from '../../types/user';

const DeleteModal = ({
    isModalOpen,
    setIsModalOpen,
    handleConfirm,
    selectedUser,
}: UserModalProps) => {
    return (
        <Modal
            open={isModalOpen}
            onOk={() => handleConfirm(selectedUser as UserListDataProps)}
            onCancel={() => setIsModalOpen(false)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            title="Confirm Deletion"
            centered
        >
            Are you sure you want to delete{' '}
            <strong>
                {selectedUser?.first_name} {selectedUser?.last_name}
            </strong>
            ?
        </Modal>
    );
};

export default DeleteModal;
