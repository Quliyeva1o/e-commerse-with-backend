import React, { useContext, useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { delOne, getOne, patch } from '../../../services/API/requests';
import { enpoints } from '../../../services/constants';
import { FormGroup, TextField } from '@mui/material';
import { LocalUserContext, UsersContext } from '../../../context/usersContext';
import { AdminContext } from '../../../context/adminContext';

const Users = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [searchText, setSearchText] = useState('');
  const { localAdmin, setLocalAdmin } = useContext(AdminContext)
  const [searchedColumn, setSearchedColumn] = useState('');
  const [editingUser, seteditingUser] = useState(null); // State to store the user being edited
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [editedRole, setEditedRole] = useState(''); // State to store edited role


  const searchInput = useRef(null);

  const handleOk = () => {
    editRole();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    seteditingUser(null);
    setEditedRole('');
  };


  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    seteditingUser(userToEdit);
    setIsModalVisible(true);
  };

  const editRole = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? { ...user, role: editedRole } : user
    );
    setUsers(updatedUsers);
    setIsModalVisible(false);
    seteditingUser(null);
    setEditedRole('');
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
       setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Profile Picture',
      dataIndex: 'profileImg',
      key: 'profileImg',
      width: '20%',
      render: (_, record) => (
        <img
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
          src={record.profileImg}
          alt="Profile"
        />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '20%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
      ...getColumnSearchProps('role'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ...getColumnSearchProps('createdAt'),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'delete',
      render: (_, record) =>localAdmin.role == "superadmin" && <a onClick={() => handleDel(record.id)}>Delete</a>,
    },

    {
      title: 'Edit',
      dataIndex: 'id',
      key: 'edit',
      render: (_, record) => localAdmin.role == "superadmin" && <a onClick={() => handleEdit(record.id)}>Edit</a>,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        title="Edit user's role"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType='submit' onClick={() => {
            const updatedUser = { ...editingUser, role: editingUser.role };
            const updatedUsers = users.map(user =>
              user.id === editingUser.id ? updatedUser : user
            );
            setUsers(updatedUsers);
            patch(enpoints.users, editingUser.id, updatedUser)

            setIsModalVisible(false);
          }}>
            Submit
          </Button>,
        ]}
      >
        <Input value={editingUser ? editingUser.role : ''} onChange={(e) => seteditingUser({ ...editingUser, role: e.target.value })} />
      </Modal>
    </>
  );
};

export default Users;
