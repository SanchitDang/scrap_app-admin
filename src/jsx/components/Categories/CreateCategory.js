import React, { useState } from 'react';
import { apiUrl } from '../../../constants';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import DropzoneBlog from '../Dashboard/Invoices/DropzoneBlog';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            name,
            description
        };

        try {
            const response = await axios.post(apiUrl+'categories', userData);

            if (selectedFile) {
                const formData = new FormData();
                formData.append('user_type', 'category');
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

            history.push('categories-list');
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
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Description</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
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
                                                Save Category
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

export default CreateCategory
