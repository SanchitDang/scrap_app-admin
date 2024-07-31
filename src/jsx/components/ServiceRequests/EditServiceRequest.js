import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const EditServiceRequest = () => {
    const { id } = useParams();
    const history = useHistory();

    const [user_id, setUser_id] = useState('');
    const [agent_id, setAgent_id] = useState('');
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const [pick_address, setPick_address] = useState('');
    const [pick_address_lat, setPick_address_lat] = useState('');
    const [pick_address_lng, setPick_address_lng] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get(apiUrl+'users');
                const agentsResponse = await axios.get(apiUrl+'agents');
                const categoriesResponse = await axios.get(apiUrl+'categories');
                const productsResponse = await axios.get(apiUrl+'products');
                const serviceRequestResponse = await axios.get(apiUrl+`serviceRequests/${id}`);
                
                setUsers(usersResponse.data);
                setAgents(agentsResponse.data);
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);

                const { user_id, agent_id, category, product, pick_address, pick_address_lat, pick_address_lng, description } = serviceRequestResponse.data;
                setUser_id(user_id);
                setAgent_id(agent_id);
                setCategory(category);
                setProduct(product);
                setPick_address(pick_address);
                setPick_address_lat(pick_address_lat);
                setPick_address_lng(pick_address_lng);
                setDescription(description);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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
            await axios.put(apiUrl+`serviceRequests/${id}`, requestData);
            history.push('/servicerequests-list');
        } catch (error) {
            console.error('Error updating service request:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="fs-24 font-w800">Edit Service Request</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-xl-4">
                                    <div className="form-group mb-3 invoice">
                                        <label>User</label>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" className="form-control">
                                                {user_id._id ? users.find(user => user._id === user_id._id)?.name : 'Select User'}
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
                                                {agent_id._id ? agents.find(agent => agent._id === agent_id._id)?.name : 'Select Agent'}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
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
                                        <label>Category</label>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" className="form-control">
                                                {category || 'Select Category'}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {categories.map(cat => (
                                                    <Dropdown.Item 
                                                        key={cat._id} 
                                                        onClick={() => setCategory(cat.name)}
                                                    >
                                                        {cat.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="form-group mb-3 invoice">
                                        <label>Product</label>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" className="form-control">
                                                {product || 'Select Product'}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {products.map(prod => (
                                                    <Dropdown.Item 
                                                        key={prod._id} 
                                                        onClick={() => setProduct(prod.name)}
                                                    >
                                                        {prod.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
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
                                <button
                                    type="button"
                                    className="btn btn-primary light btn-lg"
                                    onClick={() => history.push('/servicerequests-list')}
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

export default EditServiceRequest;
