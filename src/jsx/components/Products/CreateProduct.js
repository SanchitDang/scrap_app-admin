import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const history = useHistory();
    
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(apiUrl+'categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            name,
            description,
            category_id: selectedCategory,
        };

        try {
            const response = await axios.post(apiUrl+'products', userData);

            if (selectedFile) {
                const formData = new FormData();
                formData.append('user_type', 'product');
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

            history.push('/products-list');
        } catch (error) {
            console.error('Error creating product:', error);
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
                                            <label>Category</label>
                                            <div className="basic-dropdown">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="primary" className="form-control">
                                                        {selectedCategory ? categories.find(category => category._id === selectedCategory).name : 'Select Category'}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {categories.map((category) => (
                                                            <Dropdown.Item
                                                                key={category._id}
                                                                onClick={() => setSelectedCategory(category._id)}
                                                            >
                                                                {category.name}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
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
                                <div className="row mt-4">
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
                                                Save Product
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

export default CreateProduct;
