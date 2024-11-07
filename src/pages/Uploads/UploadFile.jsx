
import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import api from '../Auth/api';

const { Dragger } = Upload;

const UploadFile = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.error('No file selected for upload');
            return;
        }

        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });

        try {
            setUploading(true);
            const response = await api.post('/data/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            message.success(response.data.message || 'File uploaded successfully');
            setFileList([]); // Clear the file list after successful upload
        } catch (error) {
            message.error(error.response?.data?.message || 'File upload failed');
        } finally {
            setUploading(false);
        }
    };

    const props = {
        onRemove: file => {
            setFileList(prevFileList => {
                const index = prevFileList.indexOf(file);
                const newFileList = prevFileList.slice();
                newFileList.splice(index, 1);
                return newFileList;
            });
        },
        beforeUpload: file => {
            setFileList(prevFileList => [...prevFileList, file]);
            return false; // Prevent automatic upload
        },
        fileList,
    };

    return (
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Import Taxi Trip Data</p>
                <p className="ant-upload-hint">Support for a csv file only.</p>
            </Dragger>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Upload File'}
            </Button>
        </div>
    );
};

export default UploadFile;