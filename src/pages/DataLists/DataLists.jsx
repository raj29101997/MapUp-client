
import api from '../Auth/api';
import { getAPIdata } from '../../API/getAPIdata';

import React, { useState, useMemo } from 'react';
import { Table, Button, Modal, Input, message, Popconfirm, Spin } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const fetchData = async () => {
  const response = await getAPIdata(`/data/fetch-data`);
  return response.data.records;
};

const updateData = async (data) => {
  await api.post('/data/transactions', {
    body: data,
    action: 'UpdateData',
  });
};

const deleteData = async (id) => {
  await api.post('/data/transactions', {
    body: { id },
    action: 'DeleteData',
  });
};

const DataLists = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery('data', fetchData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const mutation = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries('data');
      message.success('Data updated successfully');
      setIsModalVisible(false);
      setEditingRecord(null);
    },
    onError: () => {
      message.error('Failed to update data');
    },
  });

  const deleteMutation = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries('data');
      message.success('Data deleted successfully');
    },
    onError: () => {
      message.error('Failed to delete data');
    },
  });

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  const handleSaveEdit = () => {
    mutation.mutate({
      id: editingRecord._id,
      VendorID: editingRecord.VendorID,
      tpep_pickup_datetime: editingRecord.tpep_pickup_datetime,
      tpep_dropoff_datetime: editingRecord.tpep_dropoff_datetime,
      passenger_count: editingRecord.passenger_count,
      trip_distance: editingRecord.trip_distance,
      RatecodeID: editingRecord.RatecodeID,
      store_and_fwd_flag: editingRecord.store_and_fwd_flag,
      PULocationID: editingRecord.PULocationID,
      DOLocationID: editingRecord.DOLocationID,
      payment_type: editingRecord.payment_type,
      fare_amount: editingRecord.fare_amount,
      extra: editingRecord.extra,
      mta_tax: editingRecord.mta_tax,
      tip_amount: editingRecord.tip_amount,
      tolls_amount: editingRecord.tolls_amount,
      improvement_surcharge: editingRecord.improvement_surcharge,
      total_amount: editingRecord.total_amount,
      congestion_surcharge: editingRecord.congestion_surcharge,
      Airport_fee: editingRecord.Airport_fee,
    });
  };

  const handleDelete = (record) => {
    deleteMutation.mutate(record._id);
  };

  const columns = useMemo(() => [
    {
      title: 'Pickup Time',
      dataIndex: 'tpep_pickup_datetime',
      key: 'tpep_pickup_datetime',
    },
    {
      title: 'Dropoff Time',
      dataIndex: 'tpep_dropoff_datetime',
      key: 'tpep_dropoff_datetime',
    },
    {
      title: 'Passenger Count',
      dataIndex: 'passenger_count',
      key: 'passenger_count',
    },
    {
      title: 'Trip Distance',
      dataIndex: 'trip_distance',
      key: 'trip_distance',
    },
    {
      title: 'Ratecode ID',
      dataIndex: 'RatecodeID',
      key: 'RatecodeID',
    },
    {
      title: 'Payment Type',
      dataIndex: 'payment_type',
      key: 'payment_type',
    },
    {
      title: 'Fare Amount',
      dataIndex: 'fare_amount',
      key: 'fare_amount',
    },
    {
      title: 'Actions',
      key: 'actions',
      className: 'actions-column',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ], []);

  if (isLoading) return <Spin tip="Loading..." />;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <h1 style={{"textAlign":"center","fontWeight":"bold","fontSize":"16px","marginBottom":"20px"}}>Lists Of Trip Data</h1>

      <Table columns={columns} dataSource={data} rowKey="_id" />
      {isModalVisible && (
        <Modal
          title="Edit Taxi Trip Record"
          visible={isModalVisible}
          onOk={handleSaveEdit}
          onCancel={() => setIsModalVisible(false)}
          okText="Save"
        >
          <div style={{ marginBottom: 10 }}>
            <label>Pickup Time:</label>
            <Input
              value={editingRecord?.tpep_pickup_datetime}
              onChange={(e) => setEditingRecord({ ...editingRecord, tpep_pickup_datetime: e.target.value })}
              placeholder="Enter Pickup Time"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Dropoff Time:</label>
            <Input
              value={editingRecord?.tpep_dropoff_datetime}
              onChange={(e) => setEditingRecord({ ...editingRecord, tpep_dropoff_datetime: e.target.value })}
              placeholder="Enter Dropoff Time"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Passenger Count:</label>
            <Input
              value={editingRecord?.passenger_count}
              onChange={(e) => setEditingRecord({ ...editingRecord, passenger_count: e.target.value })}
              placeholder="Enter Passenger Count"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Trip Distance:</label>
            <Input
              value={editingRecord?.trip_distance}
              onChange={(e) => setEditingRecord({ ...editingRecord, trip_distance: e.target.value })}
              placeholder="Enter Trip Distance"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Fare Amount:</label>
            <Input
              value={editingRecord?.fare_amount}
              onChange={(e) => setEditingRecord({ ...editingRecord, fare_amount: e.target.value })}
              placeholder="Enter Fare Amount"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DataLists;