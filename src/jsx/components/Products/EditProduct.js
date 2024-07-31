import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProduct = () => {
    const { id } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(apiUrl+`products/${id}`);
                setFormData({
                    name: response.data.name || '',
                    description: response.data.description || '',
                    category_id: response.data.category_id || '',
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(apiUrl+'categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProductData();
        fetchCategories();
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
            await axios.put(apiUrl+`products/${id}`, formData);
            history.push('/products-list');
        } catch (error) {
            console.error('Error updating product:', error);
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
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-xl-4">
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Enter Description"
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
                                                    {formData.category_id
                                                        ? categories.find(category => category._id === formData.category_id)?.name || 'Select Category'
                                                        : 'Select Category'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {categories.map((category) => (
                                                        <Dropdown.Item
                                                            key={category._id}
                                                            onClick={() => setFormData({ ...formData, category_id: category._id })}
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
                            <div className="text-end mt-4">
                                <button type="submit" className="btn btn-primary btn-lg me-1 me-sm-3">Save Product</button>
                                <button
                                    type="button"
                                    className="btn btn-primary light btn-lg"
                                    onClick={() => history.push('/products-list')}
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

export default EditProduct;
