import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Flex, Row, Typography } from 'antd';

import type { UserListCompProps } from '../../types/user';
import styles from './UserList.module.css';

const UserListCard = ({ userData, onEdit, onDelete }: UserListCompProps) => {
    const { Title } = Typography;

    return (
        <Row gutter={[16, 16]}>
            {userData?.length > 0 &&
                userData.map((user, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                        <div className={styles.cardContainer}>
                            <Card hoverable className={styles.userCard}>
                                <Flex vertical align="center" justify="center" gap={5}>
                                    <Avatar
                                        src={user?.avatar}
                                        alt={user?.first_name}
                                        size={100}
                                        icon={<UserOutlined />}
                                        style={{ marginBottom: 16 }}
                                    />

                                    <Title level={4} style={{ margin: 0 }}>
                                        {user?.first_name} {user?.last_name}
                                    </Title>

                                    <Title level={5} style={{ margin: 0, color: 'gray' }}>
                                        {user?.email}
                                    </Title>
                                </Flex>

                                <div className={styles.cardOverlay}>
                                    <EditOutlined
                                        style={{ background: '#1677ff' }}
                                        className={styles.overlayIcon}
                                        onClick={() => onEdit(user)}
                                    />

                                    <DeleteOutlined
                                        style={{ background: '#ff4d4f' }}
                                        className={styles.overlayIcon}
                                        onClick={() => onDelete(user)}
                                    />
                                </div>
                            </Card>
                        </div>
                    </Col>
                ))}
        </Row>
    );
};

export default UserListCard;
