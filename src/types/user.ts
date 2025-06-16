import type { ChangeEvent } from 'react';

export interface UserListDataProps {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserListCompProps {
    userData: UserListDataProps[];
    onEdit: (user: UserListDataProps) => void;
    onDelete: (user: UserListDataProps) => void;
}

export interface UserModalProps {
    isModalOpen: boolean;
    handleConfirm: (userDetails: UserListDataProps) => void;
    setIsModalOpen: (open: boolean) => void;
    selectedUser?: UserListDataProps | null;
    modalMode?: 'create' | 'edit';
}

export interface UserLoginProps {
    email: string;
    password: string;
}

export interface UserListResProps {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserListDataProps[];
}

export interface SearchInputProps {
    searchTerm: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
