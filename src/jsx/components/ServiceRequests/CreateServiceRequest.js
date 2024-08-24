import React, { useState, useEffect } from "react";
import { apiUrl } from "../../../constants";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateServiceRequest = () => {
  const [user_id, setUser_id] = useState("");
  const [agent_id, setAgent_id] = useState(null);
  const [pick_address, setPick_address] = useState("");
  const [pick_address_lat, setPick_address_lat] = useState("");
  const [pick_address_lng, setPick_address_lng] = useState("");
  const [pick_date, setPick_date] = useState("");
  const [pick_time, setPick_time] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("");
  const [agents, setAgents] = useState([]);
  const history = useHistory();
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...productDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      product: selectedProducts[index],
      [field]: parseFloat(value) || 0,
    };
    setProductDetails(updatedDetails);
  };

  useEffect(() => {
    const total = productDetails.reduce(
      (sum, item) => sum + (item.amount_paid * item.quantity || 0),
      0
    );
    setTotalPrice(total);
  }, [productDetails]);

  const addCategory = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
      setProducts(totalProducts.filter((data) => data.category_id.name === category))
    }
  };

  const removeCategory = (category) => {
    // Remove the category from the selected categories list
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  
    // Find the products associated with the removed category
    const productss = totalProducts
      .filter((data) => data.category_id.name === category)
      .map((data) => data.name);
  
    // Loop through the productss array and apply the logic of removeProduct directly
    const updatedProducts = selectedProducts.filter(
      (p) => !productss.includes(p)
    );
    
    const updatedDetails = productDetails.filter(
      (item) => !productss.includes(item.product)
    );
  
    // Update the state with the filtered products and details
    setSelectedProducts(updatedProducts);
    setProductDetails(updatedDetails);
  };

  const addProduct = (product) => {
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (product) => {
    const updatedProducts = selectedProducts.filter((p) => p !== product);
    const updatedDetails = productDetails.filter(
      (item) => item.product !== product
    );
    setSelectedProducts(updatedProducts);
    setProductDetails(updatedDetails);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(apiUrl + "users");
        const agentsResponse = await axios.get(apiUrl + "agents");
        const categoriesResponse = await axios.get(apiUrl + "categories");
        const productsResponse = await axios.get(apiUrl + "products");
        setUsers(usersResponse.data);
        setAgents(agentsResponse.data);
        setCategories(categoriesResponse.data);
        // setProducts(productsResponse.data);  // initially dont set any products, as they will come acc to categories
        setTotalProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      type,
      pick_address,
      pick_address_lat,
      pick_address_lng,
      description,
      appointment_date: pick_date,
      completion_date: pick_time,
    };

    try {
      await axios.post(apiUrl + "serviceRequests", requestData);
      history.push("/servicerequests-list/" + type);
    } catch (error) {
      console.error("Error creating service request:", error);
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
                        <Dropdown.Toggle
                          variant="primary"
                          className="form-control"
                        >
                          {user_id
                            ? users.find((user) => user._id === user_id)?.name
                            : "Select User"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {users.map((user) => (
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
                        <Dropdown.Toggle
                          variant="primary"
                          className="form-control"
                        >
                          {agent_id
                            ? agents.find((agent) => agent._id === agent_id)
                                ?.name
                            : "No Agent"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item key="no-agent" onClick={() => setAgent_id(null)}> No Agent </Dropdown.Item> */}
                          {agents.map((agent) => (
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
                        <Dropdown.Toggle
                          variant="primary"
                          className="form-control"
                        >
                          {type || "Select Service Type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            type="waste-collection"
                            onClick={() => setType("waste-collection")}
                          >
                            {" "}
                            Waste Collection{" "}
                          </Dropdown.Item>
                          <Dropdown.Item
                            type="buy-request"
                            onClick={() => setType("buy-request")}
                          >
                            {" "}
                            Buy Request{" "}
                          </Dropdown.Item>
                          <Dropdown.Item
                            type="sell-request"
                            onClick={() => setType("sell-request")}
                          >
                            {" "}
                            Sell Request{" "}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-4">
                      <div className="form-group mb-3 invoice">
                        <label>Category</label>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="primary"
                            className="form-control"
                          >
                            {selectedCategories.length > 0
                              ? "Categories Selected"
                              : "Select Category"}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {categories.map((cat) => (
                              <Dropdown.Item
                                key={cat._id}
                                onClick={() => addCategory(cat.name)}
                              >
                                {cat.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                        <Table striped bordered hover className="mt-2">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Category</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedCategories.map((cat, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{cat}</td>
                                <td>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeCategory(cat)}
                                  >
                                    Remove
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="form-group mb-3 invoice">
                        <label>Product</label>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="primary"
                            className="form-control"
                          >
                            {selectedProducts.length > 0
                              ? "Products Selected"
                              : "Select Product"}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {products.map((prod) => (
                              <Dropdown.Item
                                key={prod._id}
                                onClick={() => addProduct(prod.name)}
                              >
                                {prod.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                        <Table striped bordered hover className="mt-2">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedProducts.map((prod, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{prod}</td>
                                <td>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeProduct(prod)}
                                  >
                                    Remove
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>

                  {type === "waste-collection" ? (
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="form-group mb-3 invoice">
                          <label>Pickup Date</label>
                          <DatePicker
                            selected={pick_date}
                            onChange={(date) => setPick_date(date)}
                            dateFormat="yyyy/MM/dd"
                            className="form-control"
                            placeholderText="Select Pickup Date"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="form-group mb-3 invoice">
                          <label>Pickup Time</label>
                          <DatePicker
                            selected={pick_time}
                            onChange={(time) => setPick_time(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className="form-control"
                            placeholderText="Select Pickup Time"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
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
                <Table striped bordered hover className="mt-2">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map((prod, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{prod}</td>
                        <td>
                          <input
                            type="number"
                            placeholder="Enter quantity"
                            value={productDetails[index]?.quantity || ""}
                            onChange={(e) =>
                              handleDetailChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="Enter price"
                            value={productDetails[index]?.amount_paid || ""}
                            onChange={(e) =>
                              handleDetailChange(
                                index,
                                "amount_paid",
                                e.target.value
                              )
                            }
                            className="form-control"
                          />
                        </td>
                        <td>
                          Rs.
                          {(
                            (productDetails[index]?.quantity || 0) *
                            (productDetails[index]?.amount_paid || 0)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="4" className="text-right">
                        <strong>Total Price:</strong>
                      </td>
                      <td>
                        <strong>Rs.{totalPrice.toFixed(2)}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
                <div className="text-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg me-1 me-sm-3"
                  >
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
