import './App.css';

import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import DefaultLoader from './components/loaders/DefaultLoader';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const UserList = lazy(() => import('./pages/UserList'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<DefaultLoader />}>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user-list"
                        element={
                            <ProtectedRoute>
                                <UserList />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
