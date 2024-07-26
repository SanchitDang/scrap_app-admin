import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditInventoryManager = () => {
    const { id } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '',
    });
    const [loading, setLoading] = useState(true);

    const roles = ['admin', 'inventory-manager'];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5173/api/admins/${id}`);
                setFormData({
                    name: response.data.name || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    password: '',
                    role: response.data.role || 'admin', // Set default role if not provided
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRoleChange = (role) => {
        setFormData({
            ...formData,
            role,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:5173/api/admins/${id}`, formData);
            history.push('/inventorymanagers-list');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="fs-24 font-w800">GENERAL</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-xl-4">
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Full Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter Email"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="form-group mb-3">
                                        <label>Phone</label>
                                        <input
                                            type="phone"
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter Phone"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-xl-4">
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter Password"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="form-group mb-3 invoice">
                                        <label>Role</label>
                                        <div className="basic-dropdown">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" className="form-control">
                                                    {formData.role || 'Select Role'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {roles.map((roleOption) => (
                                                        <Dropdown.Item
                                                            key={roleOption}
                                                            onClick={() => handleRoleChange(roleOption)}
                                                        >
                                                            {roleOption}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-end mt-4">
                                <button type="submit" className="btn btn-primary btn-lg me-1 me-sm-3">
                                    Save Inventory Manager
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary light btn-lg"
                                    onClick={() => history.push('/inventorymanagers-list')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInventoryManager;
