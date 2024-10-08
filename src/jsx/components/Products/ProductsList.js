import React, { useEffect, useState } from 'react';
import { apiUrl, baseUrl } from '../../../constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Dropdown, Modal, Button } from 'react-bootstrap';


import profile from "../../../images/tool.png";

const DropdownBlog = ({ userId, onDelete, isDisabled }) => {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleEdit = () => {
        history.push(`/edit-product/${userId}`);
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
                    <Dropdown.Item onClick={handleShow}>{isDisabled ? 'Enable' : 'Disable'}</Dropdown.Item>
                    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal className="fade" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isDisabled ? 'Enable' : 'Disable'} product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to {isDisabled ? 'Enable' : 'Disable'} this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                    <Button variant="danger light" onClick={handleDelete}>{isDisabled ? 'Enable' : 'Disable'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const ProductsList = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    const handleChangeStatus = async (id) => {
        const user_type = 'product';
        const user_id = id;
    
        try {
            await axios.put(`${apiUrl}dashboard/toggleStatusById`, {
                user_type,
                user_id,
            });
    
            const updatedData = data.map(user => {
                if (user._id === id) {
                    return { ...user, disabled: !user.disabled };  // Toggle the disabled status
                }
                return user;
            });
    
            setData(updatedData);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl+'products');
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
        // try {
        //     await axios.delete(apiUrl+`products/${userId}`);
        //     setData(data.filter(user => user._id !== userId));
        // } catch (error) {
        //     console.error('Error deleting user:', error);
        // }
        const user_type = 'product';
        const user_id = userId;
    
        try {
            await axios.put(`${apiUrl}dashboard/toggleStatusById`, {
                user_type,
                user_id,
            });
    
            const updatedData = data.map(user => {
                if (user._id === userId) {
                    return { ...user, disabled: !user.disabled };  // Toggle the disabled status
                }
                return user;
            });
    
            setData(updatedData);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <>
            <div className="d-flex mb-3">
                <div className="mb-3 align-items-center me-auto">
                    <h4 className="fs-24 font-w800">products</h4>
                    <span className="fs-12">List of all the products</span>
                </div>
                <li className="nav-item invoices-btn">
                    <Link to="/create-product" className="btn btn-primary ms-5">
                        <i className="far fa-file-alt fs-20 me-2"></i>Add product
                    </Link>
                </li>
            </div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="table-responsive table-hover fs-14 dataTables_wrapper" id="invoices-data">
                        <table className='table display mb-4 dataTablesCard dataTable no-footer' id='example5'>
                            <thead>
                                <tr role='row'>
                                    <th className="sorting_asc">Name</th>
                                    <th className="sorting_asc">Category</th>
                                    <th className="sorting_asc">Status</th>
                                    <th className="sorting_asc">Date Created</th>
                                    <th className="sorting_asc"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map(user => (
                                    <tr key={user._id} role='row'>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img src={user.image_url === "" ? (profile) : (baseUrl+user.image_url)} alt="" className="rounded me-3" width="50" />
                                                <div>
                                                    <h6 className="fs-16 text-black font-w600 mb-0 text-nowrap">{user.name}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="text-black">{user.category_id.name}</span></td>
                                        <td>
                                            {!user.disabled ? (
                                                <Link to="#" className="btn btn-success light" onClick={() => handleChangeStatus(user._id)}>Enabled</Link>
                                            ) : (
                                                <Link to="#" className="btn btn-danger light" onClick={() => handleChangeStatus(user._id)}>Disabled</Link>
                                            )}
                                        </td>
                                        <td><span className="text-black text-nowrap">{new Date(user.createdAt).toLocaleDateString()}</span></td>
                                        <td><DropdownBlog userId={user._id} onDelete={handleDelete} isDisabled={user.disabled} /></td>
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
                                    to='/categories-list'
                                    className='paginate_button previous'
                                    onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
                                >
                                    <i className="fa fa-angle-double-left"></i>
                                </Link>
                                <span>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Link
                                            key={i}
                                            to='/categories-list'
                                            className={`paginate_button ${currentPage === i ? 'current' : ''}`}
                                            onClick={() => handlePageChange(i)}
                                        >
                                            {i + 1}
                                        </Link>
                                    ))}
                                </span>
                                <Link
                                    to='/categories-list'
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

export default ProductsList;
