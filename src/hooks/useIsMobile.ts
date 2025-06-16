import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const useIsMobile = () => {
    const sizes = useBreakpoint();
    return !sizes.md;
};

export default useIsMobile;
