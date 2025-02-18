import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import './styles.scss';
import Title from '../components/Title';
import { fetchUsers } from '../../../../services/api/userApi';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    
    useEffect(() => {
      const loadUsers = async() => {
        try {
          const { users } = await fetchUsers();
          setUsers(users);
          setFilteredUsers(users);
        } catch (error) {
          console.log(error);
        }
      }

      loadUsers();
    }, []);

    const handleSearch = (e) => {
      const term = e.target.value;

      const filtered = users.filter(user => 
        user.userCode.toLowerCase().includes(term.toLowerCase()) || 
        user.profile.name.toLowerCase().includes(term.toLowerCase())
      );
    
      setFilteredUsers(filtered);
    }

    const columns = [
      {
          title: 'Mã khách hàng',
          dataIndex: 'code',
          key: 'code',
      },
      {
        title: 'Họ và Tên',
        dataIndex: ['profile', 'name'],
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
      },
      {
          title: 'Hành động',
          key: 'action',
          render: (text, record) => (
              <Button>
              Chi tiết
              </Button>
          ),
      },
    ];
      
    return (
        <div className='customer-wr'>
            <Title onChange={handleSearch} /> 
            <Table 
              columns={columns} 
              dataSource={filteredUsers} 
              className='customer-list'
              rowKey="code"
            />
        </div>
    );
}

export default Customers;