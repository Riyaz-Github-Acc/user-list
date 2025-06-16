import { UserOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { Link } from 'react-router';

const Home = () => {
    const { Title, Paragraph } = Typography;

    return (
        <div
            style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0px 16px',
            }}
        >
            <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%', textAlign: 'center' }}
            >
                <UserOutlined style={{ fontSize: 64, color: '#1677ff' }} />
                <Title level={2}>User Management Portal</Title>

                <Paragraph mark>
                    Manage, create, edit, and delete users from one central place.
                </Paragraph>

                <Link to="/user-list">
                    <Button type="primary" size="large">
                        Go to User List
                    </Button>
                </Link>
            </Space>
        </div>
    );
};

export default Home;
