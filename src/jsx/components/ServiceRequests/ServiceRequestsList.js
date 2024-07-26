import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Dropdown, Modal, Button } from 'react-bootstrap';

const DropdownBlog = ({ userId, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleEdit = () => {
        history.push(`/edit-servicerequests/${userId}`);
    };

    const handleDelete = () => {
        onDelete(userId);
        handleClose();
    };

    return (
        <>
            <Dropdown className="dropdown">
                <Dropdown.Toggle as="div" className="btn-link i-false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                    <Dropdown.Item onClick={handleShow}>Delete</Dropdown.Item>
                    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal className="fade" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                    <Button variant="danger light" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const ServiceRequestsList = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5173/api/serviceRequests');
                setData(response.data);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://127.0.0.1:5173/api/serviceRequests/${userId}`);
            setData(data.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <>
            <div className="d-flex mb-3">
                <div className="mb-3 align-items-center me-auto">
                    <h4 className="fs-24 font-w800">Service Requests</h4>
                    <span className="fs-12">List of all the service requests</span>
                </div>
                <li className="nav-item invoices-btn">
                    <Link to="/create-servicerequest" className="btn btn-primary ms-5">
                        <i className="far fa-file-alt fs-20 me-2"></i>Add Service Requests
                    </Link>
                </li>
            </div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="table-responsive table-hover fs-14 dataTables_wrapper" id="invoices-data">
                        <table className='table display mb-4 dataTablesCard dataTable no-footer' id='example5'>
                            <thead>
                                <tr role='row'>
                                    <th className="sorting_asc">Category</th>
                                    <th className="sorting_asc">Product</th>
                                    <th className="sorting_asc">Approval Status</th>
                                    <th className="sorting_asc">Date Created</th>
                                    <th className="sorting_asc"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map(user => (
                                    <tr key={user._id} role='row'>
                                        <td><span className="text-black">{user.category}</span></td>
                                        <td><span className="text-black">{user.product}</span></td>
                                        <td>
                                            {user.status === 'completed' ? (
                                                <Link to="#" className="btn btn-success light">Completed</Link>
                                            ) : (
                                                <Link to="#" className="btn btn-danger light">Pending</Link>
                                            )}
                                        </td>
                                        <td><span className="text-black text-nowrap">{new Date(user.createdAt).toLocaleDateString()}</span></td>
                                        <td><DropdownBlog userId={user._id} onDelete={handleDelete} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='d-sm-flex text-center justify-content-between align-items-center mb-3'>
                            <div className='dataTables_info' id='example5_info'>
                                Showing {startIndex + 1} to {endIndex > data.length ? data.length : endIndex} of {data.length} entries
                            </div>
                            <div className='dataTables_paginate paging_simple_numbers mb-0' id='example5_paginate'>
                                <Link
                                    to='servicerequests-list'
                                    className='paginate_button previous'
                                    onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
                                >
                                    <i className="fa fa-angle-double-left"></i>
                                </Link>
                                <span>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Link
                                            key={i}
                                            to='servicerequests-list'
                                            className={`paginate_button ${currentPage === i ? 'current' : ''}`}
                                            onClick={() => handlePageChange(i)}
                                        >
                                            {i + 1}
                                        </Link>
                                    ))}
                                </span>
                                <Link
                                    to='servicerequests-list'
                                    className='paginate_button next'
                                    onClick={() => currentPage + 1 < totalPages && handlePageChange(currentPage + 1)}
                                >
                                    <i className="fa fa-angle-double-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceRequestsList;
