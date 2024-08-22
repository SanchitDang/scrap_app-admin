import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

const EditUser = () => {
    const { id } = useParams(); // Get the user ID from the URL parameters
    const history = useHistory();
    const roles = ['household', 'company', 'industry', 'trader', 'recycler', 'manufacturer'];
    const [role, setRole] = useState('');

    // State to hold form data and loading state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        city: '',
        state: '',
        pincode: '',
        address: '',
        role: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data when component mounts
        const fetchUserData = async () => {
            try {
                const response = await axios.get(apiUrl+`users/${id}`);
                setFormData({
                    name: response.data.name || '',
                    phone: response.data.phone || '',
                    email: response.data.email || '',
                    password: response.data.password || '',
                    city: response.data.city || '',
                    state: response.data.state || '',
                    pincode: response.data.pincode || '',
                    address: response.data.address || '',
                    role: response.data.role || '',
                });
                setRole(response.data.role || '');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(apiUrl+`users/${id}`, formData);
            history.push('/users-list');
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
                        <h4 className="fs-24 font-w800">EDIT USER</h4>
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
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            phone="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter Phone"
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
                                    <div className="form-group mb-3">
                                        <label>City</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter City"
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4">
                                    <div className="form-group mb-3">
                                        <label>State</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Enter State"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-xl-4">
                                    <div className="form-group mb-3">
                                        <label>Pincode</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="Enter Pincode"
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4">
                                    <div className="form-group mb-3">
                                        <label>Address</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter Address"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                <div className="form-group mb-3 invoice">
                                    <label>User Role</label>
                                    <Dropdown>
                                    <Dropdown.Toggle variant="primary" className="form-control">
                                        {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Select User Role'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {roles.map((roleType) => (
                                        <Dropdown.Item
                                            key={roleType}
                                            type={roleType}
                                            onClick={() => setRole(roleType)}
                                        >
                                            {roleType.charAt(0).toUpperCase() + roleType.slice(1)}
                                        </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                </div>
                            </div>

                            <div className="text-end mt-4">
                                <button type="submit" className="btn btn-primary btn-lg me-1 me-sm-3">Save User</button>
                                <button
                                    type="button"
                                    className="btn btn-primary light btn-lg"
                                    onClick={() => history.push('/users-list')}
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

export default EditUser;
