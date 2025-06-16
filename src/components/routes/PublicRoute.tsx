import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { isAuthenticated } from '../../store/reducers/auth.reducer';
import type { ProtectedRouteProps } from '../../types/route';

const PublicRoute = ({ children, redirectUrl = '/user-list' }: ProtectedRouteProps) => {
    const authUser = useSelector(isAuthenticated);

    return !authUser ? <>{children}</> : <Navigate to={redirectUrl} />;
};

export default PublicRoute;
