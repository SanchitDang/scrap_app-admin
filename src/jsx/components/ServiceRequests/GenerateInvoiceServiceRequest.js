import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../../constants';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import  DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GenerateInvoiceServiceRequest = () => {
    const { id } = useParams();
    const history = useHistory();

    const [user_id, setUser_id] = useState('');
    const [agent_id, setAgent_id] = useState(null);
    const [completion_date, setCompletionDate] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [pick_address, setPick_address] = useState('');
    const [pick_address_lat, setPick_address_lat] = useState('');
    const [pick_address_lng, setPick_address_lng] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [productDetails, setProductDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...productDetails];
        updatedDetails[index] = {
            ...updatedDetails[index],
            product: selectedProducts[index],
            [field]: parseFloat(value) || 0
        };
        setProductDetails(updatedDetails);
    };

    useEffect(() => {
        const total = productDetails.reduce(
            (sum, item) => sum + (item.amount_paid * item.quantity || 0), 0
        );
        setTotalPrice(total);
    }, [productDetails]);

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
        const updatedProducts = selectedProducts.filter((p) => p !== product);
        const updatedDetails = productDetails.filter((item) => item.product !== product);
        setSelectedProducts(updatedProducts);
        setProductDetails(updatedDetails);
    };

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

                const { user_id, agent_id, type, completion_date, status, amount_paid_each_product, category, product, pick_address, pick_address_lat, pick_address_lng, description } = serviceRequestResponse.data;
                setUser_id(user_id);
                setAgent_id(agent_id);
                setType(type);
                setCompletionDate(new Date(completion_date));
                setStatus(status);
                setSelectedCategories(category);
                // setSelectedProducts(product);
                setPick_address(pick_address);
                setPick_address_lat(pick_address_lat);
                setPick_address_lng(pick_address_lng);
                setDescription(description);
                
                console.log(amount_paid_each_product)
                const selectedProducts = amount_paid_each_product.map(productDetail => productDetail.product);
                const productDetails = amount_paid_each_product.map(productDetail => ({
                    quantity: productDetail.quantity,
                    amount_paid: productDetail.amount_paid,
                }));
                setSelectedProducts(selectedProducts);
                setProductDetails(productDetails);

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

        const productsWithDetails = selectedProducts.map((product, index) => ({
            product,
            quantity: productDetails[index]?.quantity || 0,
            amount_paid: productDetails[index]?.amount_paid || 0,
        }));

        const requestData = {
            user_id,
            agent_id,
            category: selectedCategories,
            product: selectedProducts,
            amount_paid_each_product: productsWithDetails,
            pick_address,
            completion_date,
            type,
            pick_address_lat,
            pick_address_lng,
            description
        };

        console.log(requestData);  
        const encodedData = encodeURIComponent(JSON.stringify(requestData));
        console.log(type);
        type == "sell-request" ?
        history.push(`/final-generate-invoice-servicerequest/${encodedData}`) :
        history.push(`/final-generate-invoice-simple-servicerequest/${encodedData}`);

    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
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
                                <div className="col-xl-4">
                                    <div className="form-group mb-3 invoice">
                                        <label>Completion Date</label>
                                        <DatePicker
                                            selected={completion_date}
                                            onChange={(date) => setCompletionDate(date)}
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            className="form-control"
                                            placeholderText="Select Completion Date & Time"
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
                                <div>
                                    <ul className="mt-2">
                                        {selectedProducts.map((prod, index) => (
                                            <li key={index}>
                                                {prod}
                                                <input
                                                    type="number"
                                                    placeholder="Enter quantity"
                                                    value={productDetails[index]?.quantity || ''}
                                                    onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Enter price"
                                                    value={productDetails[index]?.amount_paid || ''}
                                                    onChange={(e) => handleDetailChange(index, 'amount_paid', e.target.value)}
                                                />
                                                {/* <Button variant="danger" size="sm" onClick={() => removeProduct(prod)}>Remove</Button> */}
                                            </li>
                                        ))}
                                    </ul>
                                    <div>Total Price: Rs.{totalPrice.toFixed(2)}</div>
                                    {/* <Button variant="primary" onClick={handleProductDetailAdd}>Save</Button> */}
                                </div>
                            </div>
                            <div className="text-end mt-4">
                                <button type="submit" className="btn btn-primary btn-lg me-1 me-sm-3">
                                    Generate Invoce
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateInvoiceServiceRequest;
