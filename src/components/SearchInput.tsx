import { Space } from 'antd';
import Search from 'antd/es/input/Search';

import type { SearchInputProps } from '../types/user';

const SearchInput = ({ searchTerm, onChange }: SearchInputProps) => {
    return (
        <Space.Compact>
            <Search
                placeholder="Search by name"
                allowClear
                value={searchTerm}
                onChange={onChange}
            />
        </Space.Compact>
    );
};

export default SearchInput;
