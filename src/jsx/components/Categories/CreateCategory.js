import React, { useState } from 'react';
import { apiUrl } from '../../../constants';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import DropzoneBlog from '../Dashboard/Invoices/DropzoneBlog';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            name,
            description
        };

        try {
            await axios.post(apiUrl+'categories', userData);
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
                                    <div className="col-xl-6">
                                    </div>
                                    <div className="col-xl-6">
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
