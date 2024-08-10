import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const CreateServiceRequest = () => {
    const [user_id, setUser_id] = useState('');
    const [agent_id, setAgent_id] = useState(null);
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [pick_address, setPick_address] = useState('');
    const [pick_address_lat, setPick_address_lat] = useState('');
    const [pick_address_lng, setPick_address_lng] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [type, setType] = useState('');
    const [agents, setAgents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const history = useHistory();

    const addCategory = (category) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const removeCategory = (category) => {
        setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    };

    const addProduct = (product) => {
        if (!selectedProducts.includes(product)) {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const removeProduct = (product) => {
        setSelectedProducts(selectedProducts.filter(prod => prod !== product));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get(apiUrl+'users');
                const agentsResponse = await axios.get(apiUrl+'agents');
                const categoriesResponse = await axios.get(apiUrl+'categories');
                const productsResponse = await axios.get(apiUrl+'products');
                setUsers(usersResponse.data);
                setAgents(agentsResponse.data);
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            user_id,
            agent_id,
            category,
            product,
            pick_address,
            pick_address_lat,
            pick_address_lng,
            description
        };

        try {
            await axios.post(apiUrl+'serviceRequests', requestData);
            history.push('/servicerequests-list');
        } catch (error) {
            console.error('Error creating service request:', error);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="fs-24 font-w800">Create Service Request</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>User</label>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" className="form-control">
                                                    {user_id ? users.find(user => user._id === user_id)?.name : 'Select User'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {users.map(user => (
                                                        <Dropdown.Item 
                                                            key={user._id} 
                                                            onClick={() => setUser_id(user._id)}
                                                        >
                                                            {user.name}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Agent</label>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" className="form-control">
                                                    {agent_id ? agents.find(agent => agent._id === agent_id)?.name : 'No Agent'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {/* <Dropdown.Item key="no-agent" onClick={() => setAgent_id(null)}> No Agent </Dropdown.Item> */}
                                                    {agents.map(agent => (
                                                        <Dropdown.Item 
                                                            key={agent._id} 
                                                            onClick={() => setAgent_id(agent._id)}
                                                        >
                                                            {agent.name}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Service Type</label>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="primary" className="form-control">
                                                    {type || 'Select Service Type'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                        <Dropdown.Item type='waste-collection' onClick={() => setType("waste-collection")}> Waste Collection </Dropdown.Item>
                                                        <Dropdown.Item type='buy-request' onClick={() => setType("buy-request")}> Buy Request </Dropdown.Item>
                                                        <Dropdown.Item type='sell-request' onClick={() => setType("sell-request")}> Sell Request </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-4">                                      
                                            <div className="form-group mb-3 invoice">
                                                <label>Category</label>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="primary" className="form-control">
                                                        {selectedCategories.length > 0 ? 'Categories Selected' : 'Select Category'}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {categories.map(cat => (
                                                            <Dropdown.Item 
                                                                key={cat._id} 
                                                                onClick={() => addCategory(cat.name)}
                                                            >
                                                                {cat.name}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <ul className="mt-2">
                                                    {selectedCategories.map((cat, index) => (
                                                        <li key={index}>
                                                            {cat} 
                                                            <Button variant="danger" size="sm" onClick={() => removeCategory(cat)}>Remove</Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="form-group mb-3 invoice">
                                                <label>Product</label>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="primary" className="form-control">
                                                        {selectedProducts.length > 0 ? 'Products Selected' : 'Select Product'}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {products.map(prod => (
                                                            <Dropdown.Item 
                                                                key={prod._id} 
                                                                onClick={() => addProduct(prod.name)}
                                                            >
                                                                {prod.name}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <ul className="mt-2">
                                                    {selectedProducts.map((prod, index) => (
                                                        <li key={index}>
                                                            {prod} 
                                                            <Button variant="danger" size="sm" onClick={() => removeProduct(prod)}>Remove</Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Pickup Address Latitude</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Pickup Address Latitude"
                                                value={pick_address_lat}
                                                onChange={(e) => setPick_address_lat(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="form-group mb-3 invoice">
                                            <label>Pickup Address Longitude</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Pickup Address Longitude"
                                                value={pick_address_lng}
                                                onChange={(e) => setPick_address_lng(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                    <div className="form-group mb-3 invoice">
                                        <label className="form-label">Address</label>
                                        <input
                                        type="text"
                                        placeholder="Enter Address"
                                        className="form-control"
                                        value={pick_address}
                                        onChange={(e) => setPick_address(e.target.value)}
                                        />
                                    </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="form-group mb-3 invoice">
                                            <label>Description</label>
                                            <textarea
                                            rows={6}
                                            className="form-control bg-transparent"
                                            placeholder="Enter the description...."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end mt-4">
                                    <button type="submit" className="btn btn-primary btn-lg me-1 me-sm-3">
                                        Save Service Request
                                    </button>
                                    <Link to="#" className="btn btn-primary light btn-lg">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateServiceRequest;
