import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Table } from 'antd';

import type { UserListCompProps, UserListDataProps } from '../../types/user';

const UserListTable = ({ userData, onEdit, onDelete }: UserListCompProps) => {
    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '20%',
            render: (avatar: string, record: UserListDataProps) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        src={avatar}
                        alt={record?.first_name}
                        size={40}
                        icon={<UserOutlined />}
                    />
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            render: (email: string) => (
                <span style={{ whiteSpace: 'nowrap', color: '#1677ff' }}>{email}</span>
            ),
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            width: '20%',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            width: '20%',
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_: unknown, user: UserListDataProps) => (
                <Flex gap={10}>
                    <Button color="primary" variant="solid" onClick={() => onEdit(user)}>
                        Edit
                    </Button>

                    <Button color="danger" variant="solid" onClick={() => onDelete(user)}>
                        Delete
                    </Button>
                </Flex>
            ),
        },
    ];

    return (
        <Table<UserListDataProps>
            rowKey={'id'}
            columns={columns}
            dataSource={userData}
            scroll={{ x: 'max-content' }}
            pagination={false}
            virtual
        />
    );
};

export default UserListTable;
