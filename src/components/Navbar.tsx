import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router';

import { logoutUser } from '../store/actions/auth.action';
import type { AppDispatch } from '../store/store';

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav>
            <div>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                    Home
                </NavLink>
                <NavLink
                    to={'/user-list'}
                    className={({ isActive }) => (isActive ? 'link active' : 'link')}
                >
                    User List
                </NavLink>
            </div>
            <Button color="danger" variant="solid" onClick={handleLogout}>
                Logout
            </Button>
        </nav>
    );
};

export default Navbar;
