import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Empty, Flex, Pagination, Segmented } from 'antd';
import { type ChangeEvent, lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLoader from '../components/loaders/DefaultLoader';
import SearchInput from '../components/SearchInput';
import UserListTable from '../components/userList/UserListTable';
import useIsMobile from '../hooks/useIsMobile';
import {
    createUser,
    deleteUser,
    fetchUserList,
    updateUser,
} from '../store/actions/userList.action';
import type { AppDispatch, RootState } from '../store/store';
import type { UserListDataProps } from '../types/user';

const UserModal = lazy(() => import('../components/modals/UserModal'));
const DeleteModal = lazy(() => import('../components/modals/DeleteModal'));
const UserListCard = lazy(() => import('../components/userList/UserListCard'));

const UserList: React.FC = () => {
    const isMobile = useIsMobile();
    const dispatch = useDispatch<AppDispatch>();
    const { list } = useSelector((state: RootState) => state.userList);

    const { loading, data } = list;
    const userData = data || [];
    const pageSize = 6;

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
    const [selectedUser, setSelectedUser] = useState<UserListDataProps | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    // Search
    const filteredUsers = userData.filter((user) => {
        const fullName = `${user?.first_name} ${user?.last_name}`.toLowerCase().trim();
        return fullName.includes(searchTerm.toLowerCase().trim());
    });

    const totalFilteredUsers = filteredUsers.length;

    // Pagination
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);

    useEffect(() => {
        const totalPages = Math.ceil(totalFilteredUsers / pageSize);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalFilteredUsers, currentPage, pageSize]);

    // Handlers
    const handleCreateClick = () => {
        setModalMode('create');
        setSelectedUser(null);
        setIsUserModalOpen(true);
    };

    const handleEditClick = (user: UserListDataProps) => {
        setModalMode('edit');
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    const handleUserFormSubmit = (formData: UserListDataProps) => {
        if (modalMode === 'edit') {
            dispatch(updateUser({ ...formData, id: selectedUser?.id as number }));
            // console.log('Edited User:', formData);
        } else {
            dispatch(createUser(formData));
            // console.log('Created User:', formData);
        }
        setIsUserModalOpen(false);
    };

    const handleDeleteClick = (user: UserListDataProps) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = (deleteUserData: UserListDataProps) => {
        dispatch(deleteUser(deleteUserData.id));
        // console.log('Deleting user:', deleteUserData);
        setIsDeleteModalOpen(false);
    };

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleViewModeChange = (value: string) => setViewMode(value as 'table' | 'card');
    const handlePageChange = (newPage: number) => setCurrentPage(newPage);

    return (
        <Flex vertical style={{ margin: isMobile ? '15px' : '30px' }}>
            <Flex
                vertical
                justify="space-between"
                align={isMobile ? 'stretch' : 'start'}
                gap="large"
                style={{
                    background: '#fff',
                    padding: isMobile ? '12px' : '20px',
                    marginBottom: isMobile ? '12px' : '20px',
                }}
            >
                <Flex
                    vertical={isMobile}
                    align="center"
                    justify="space-between"
                    gap={10}
                    style={{ width: '100%' }}
                >
                    <h2 style={{ margin: '0' }}>Users</h2>

                    <Flex gap={10} vertical={isMobile}>
                        <SearchInput searchTerm={searchTerm} onChange={onSearchChange} />

                        <Button color="primary" variant="solid" onClick={handleCreateClick}>
                            Create User
                        </Button>
                    </Flex>
                </Flex>

                <Segmented
                    options={[
                        { label: 'Table', value: 'table', icon: <TableOutlined /> },
                        { label: 'Card', value: 'card', icon: <AppstoreOutlined /> },
                    ]}
                    value={viewMode}
                    onChange={handleViewModeChange}
                    style={{ width: 'fit-content' }}
                />
            </Flex>

            {loading ? (
                <DefaultLoader />
            ) : userData?.length > 0 ? (
                <>
                    {viewMode === 'table' ? (
                        <UserListTable
                            userData={paginatedUsers}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ) : (
                        <Suspense fallback={<DefaultLoader />}>
                            <UserListCard
                                userData={paginatedUsers}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                            />
                        </Suspense>
                    )}

                    <Flex justify="end" style={{ marginTop: 16 }}>
                        <Pagination
                            current={currentPage}
                            total={totalFilteredUsers}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                        />
                    </Flex>
                </>
            ) : (
                <Empty description="No users available" style={{ padding: '40px 0' }} />
            )}

            <Suspense fallback={<DefaultLoader />}>
                <UserModal
                    modalMode={modalMode}
                    selectedUser={selectedUser}
                    isModalOpen={isUserModalOpen}
                    setIsModalOpen={setIsUserModalOpen}
                    handleConfirm={handleUserFormSubmit}
                />
            </Suspense>

            <Suspense fallback={<DefaultLoader />}>
                <DeleteModal
                    selectedUser={selectedUser}
                    isModalOpen={isDeleteModalOpen}
                    handleConfirm={handleConfirmDelete}
                    setIsModalOpen={setIsDeleteModalOpen}
                />
            </Suspense>
        </Flex>
    );
};

export default UserList;
