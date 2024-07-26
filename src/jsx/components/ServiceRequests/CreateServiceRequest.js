import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import DropzoneBlog from '../Dashboard/Invoices/DropzoneBlog';

const CreateServiceRequest = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            fullName,
            username,
            email,
            password,
        };

        try {
            await axios.post('http://127.0.0.1:5173/api/serviceRequests', userData);
            history.push('/servicerequests-list');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="fs-24 font-w800">GENERAL</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Full Name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
									{/* <div className="col-xl-4">
										<div className="form-group mb-3 invoice">
											<label>Date</label>
											<input size="16" type="date" className="form-control" />
										</div>
									</div> */}
                                </div>
                                <h4 className="fs-24 font-w800">Profile Picture</h4>
                                <div className="row mt-4 ">
                                    <div className="col-xl-6">
                                        <div className="dropzone dropzone-multi dz-dropzone-box d-flex" id="kt_dropzone_5">
                                            <DropzoneBlog />
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="text-end mt-4">
                                            <button type="submit" className="btn btn-primary btn-lg me-1 me-sm-3">
                                                Save Service Request
                                            </button>
                                            <Link to="#" className="btn btn-primary light btn-lg">
                                                Cancel
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateServiceRequest
