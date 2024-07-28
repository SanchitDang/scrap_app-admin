import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const EditAgent = () => {
    const { id } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        date: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5173/api/agents/${id}`);
                setFormData({
                    name: response.data.name || '',
                    phone: response.data.phone || '',
                    email: response.data.email || '',
                    password: response.data.password || '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:5173/api/agents/${id}`, formData);
            history.push('/agents-list');
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
                            </div>
                            <div className="row mb-4">
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
                            </div>
                            <div className="text-end mt-4">
                                <button type="submit" className="btn btn-primary btn-lg me-1 me-sm-3">Save Agent</button>
                                <button
                                    type="button"
                                    className="btn btn-primary light btn-lg"
                                    onClick={() => history.push('/agents-list')}
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

export default EditAgent;