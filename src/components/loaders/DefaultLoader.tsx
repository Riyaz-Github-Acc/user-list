import { Flex, Spin } from 'antd';

const DefaultLoader = () => (
    <Flex align="center" justify="center" style={{ height: '50vh' }}>
        <Spin size="large" />
    </Flex>
);

export default DefaultLoader;
