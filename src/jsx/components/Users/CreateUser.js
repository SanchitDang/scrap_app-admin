import React, { useState } from 'react';
import { apiUrl } from '../../../constants';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropzoneBlog from '../Dashboard/Invoices/DropzoneBlog';

const CreateUser = () => {
    const history = useHistory();
    const roles = ['household', 'company', 'industry', 'trader', 'recycler', 'manufacturer'];

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [pan, setPan] = useState('');
    const [gst, setGst] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            name,
            phone,
            email,
            password,
            city,
            state,
            pincode,
            address,
            role,
            company_name,
            pan,    
            gst
        };

        console.log(userData)

        try {
            const response = await axios.post(apiUrl+'users', userData);

            if (selectedFile) {
                const formData = new FormData();
                formData.append('user_type', 'user');
                formData.append('user_id', response.data._id); 
                formData.append('profilePic', selectedFile);
                try {
                const response = await axios.put(apiUrl+'dashboard/uploadProfilePic', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    
                } catch (error) {
                    console.error('Error uploading profile picture', error);
                    alert('Error uploading profile picture');
                }
            }

            history.push('/users-list');
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
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Full Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
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
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter City"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter State"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
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
                                <div className="row mb-4">
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Pin Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Pin Code"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Company Name"
                                                value={company_name}
                                                onChange={(e) => setCompany_name(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Gst</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Gst"
                                                value={gst}
                                                onChange={(e) => setGst(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Pan</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Pan"
                                                value={pan}
                                                onChange={(e) => setPan(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>User Role</label>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" className="form-control">
                                                    Select User Role
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {roles.map((roleType) => (
                                                    <Dropdown.Item
                                                        key={roleType}
                                                        type={roleType}
                                                        onClick={() => setRole(roleType)}
                                                    >
                                                        {roleType.charAt(0).toUpperCase() + roleType.slice(1)} {/* Capitalize first letter */}
                                                    </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="fs-24 font-w800">Profile Picture</h4>
                                <div className="row mt-4 ">
                                    <div className="col-xl-4">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="profilePic"
                                            accept=".jpeg, .jpg, .png"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="col-xl-8">
                                        <div className="text-end mt-4">
                                            <button type="submit" className="btn btn-primary btn-lg me-1 me-sm-3">
                                                Save User
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

export default CreateUser;
