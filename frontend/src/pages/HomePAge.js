import { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Table } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Layout from '../components/layouts/Layout';
import axios from 'axios';
import moment from 'moment';
import Spinner from '../components/Spinner';
import Analytics from '../components/Analytics';

const HomePAge = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [frequency, setFrequency] = useState('7');
    const [allTransaction, setAllTransaction] = useState([]);
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Reference',
            dataIndex: 'reference'
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div>
                    <EditOutlined onClick={() => {
                        setEditable(record);
                        setShowModal(true);
                    }}
                        className='text-success' />
                    <DeleteOutlined className='mx-3 text-danger'
                        onClick={() => handleDelete(record)}
                    />
                </div>
            )
        },
    ]

    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                setLoading(true);
                const res = await axios.post('http://localhost:8080/api/v1/transactions/get-transaction', { userid: user._id, frequency })
                setLoading(false);
                setAllTransaction(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
                message.error('Fetch issue with transaction')
            }
        }
        getAllTransactions();
    }, [frequency]);

    const handleDelete = async (record) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8080/api/v1/transactions/delete-transaction', { transactionId: record._id });
            setLoading(false);
            message.success("Transaction deleted successfully");
        } catch (error) {
            console.log(error);
            message.error('Delete issue with transaction')
        }
    }
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setLoading(true);
            if (editable) {
                await axios.post('http://localhost:8080/api/v1/transactions/edit-transaction',
                    {
                        payload: {
                            ...values,
                            userid: user._id,
                            transactionId: editable._id
                        }
                    });
                setLoading(false);
                message.success('Transaction Updated Successdully');

            }
            else {
                await axios.post('http://localhost:8080/api/v1/transactions/add-transaction', { ...values, userid: user._id });
                setLoading(false);
                message.success('Transaction Added Successdully');

            }
            setShowModal(false);
            setEditable(null);
        } catch (error) {
            message.error('Failed to add transaction')
        }
    }
    return (
        <Layout>
            {loading && <Spinner />}
            <div className="filters">
                <div className='d-flex justify-content-center flex-column'>
                    <h6 className='text-primary fs-6 fw-semibold'>SELECT DURATION</h6>
                    <Select value={frequency} onChange={(values) => setFrequency(values)}>
                        <Select.Option value='7' className='fw-semibold'>LAST 1 WEEK</Select.Option>
                        <Select.Option value='30' className='fw-semibold'>LAST 1 MONTH</Select.Option>
                        <Select.Option value='365' className='fw-semibold'>LAST 1 YEAR</Select.Option>
                    </Select>
                </div>
                <div className='switch-container'>
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
                </div>
                <div>
                    <button className="btn btn-primary fw-semibold fs-6" onClick={() => setShowModal(true)}>ADD NEW RECORD</button>
                </div>
            </div>
            <div className="content">
                {viewData === 'table' ?
                    <Table columns={columns} dataSource={allTransaction} className='table-container' />
                    :
                    <Analytics allTransaction={allTransaction} />
                }
            </div>
            <Modal title={editable ? 'EDIT TRANSACTION' : 'ADD TRANSACTION'}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
                className='ant-modal-title'
            >
                <Form layout="vertical" onFinish={handleSubmit} initialValues={editable} className='ant-form-item-label' >
                    <Form.Item label="AMOUNT" name="amount" >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="TYPE" name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="CATEGORY" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fee">Fee</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="DATE" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="REFERENCE" name="reference">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="DESCRIPTION" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className='btn btn-primary'>SAVE</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default HomePAge