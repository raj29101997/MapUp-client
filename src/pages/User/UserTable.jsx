import React, { useState, useMemo } from 'react';
import { Table, Button, Select, message, Spin, Popconfirm } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAPIdata } from '../../API/getAPIdata';
import api from '../Auth/api';

const { Option } = Select;

const fetchUsers = async ({ queryKey }) => {
  const [_key, { page, limit }] = queryKey;
  const response = await getAPIdata(`/users/user-lists?page=${page}&limit=${limit}`);
  return response.data;
};

const updateUserRole = async ({ userID, newRole }) => {
  await api.post(`/auth/register`, { body: { userID, roles: newRole }, action: "UpdateUser" });
};

const deleteUser = async (userID) => {
  await api.post(`/auth/register`, { body: { userID }, action: "DeleteUser" });
};

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(['users', { page: currentPage, limit: pageSize }], fetchUsers, {
    keepPreviousData: true,
  });

  const updateUserMutation = useMutation(updateUserRole, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      message.success('Role updated successfully');
    },
    onError: () => {
      message.error('Failed to update role');
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      message.success('User deleted successfully');
    },
    onError: () => {
      message.error('Failed to delete user');
    },
  });

  const handleChangeRole = (userID, newRole) => {
    updateUserMutation.mutate({ userID, newRole });
  };

  const handleDelete = (userID) => {
    deleteUserMutation.mutate(userID);
  };

  const columns = useMemo(() => [
    {
      title: 'SR. Number',
      key: 'serialNumber',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(value) => handleChangeRole(record._id, value)}
        >
          <Option value="Admin">Admin</Option>
          <Option value="Manager">Manager</Option>
          <Option value="User">User</Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ], [currentPage, pageSize]);

  if (isLoading) return <Spin tip="Loading..." />;
  if (error) return <p>Error loading data</p>;

  return (
    <Table
      columns={columns}
      dataSource={data?.users}
      rowKey="_id"
      loading={isLoading}
      pagination={{
        current: currentPage,
        pageSize,
        onChange: (page) => setCurrentPage(page),
        showSizeChanger: false,
        total: data?.total,
      }}
    />
  );
};

export default UserTable;