import axios from 'axios';
import React, { Fragment, useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import PageTitle from "../../../layouts/PageTitle";

import { Alert } from 'react-bootstrap';
import bg5 from "../../../../images/big/img5.jpg";
import profile from "../../../../images/user.jpg";

const emojis = {
  welcome: (
    <svg
      viewBox='0 0 24 24'
      width='24'
      height='24'
      stroke='currentColor'
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='me-2'
    >
      <circle cx='12' cy='12' r='10'></circle>
      <path d='M8 14s1.5 2 4 2 4-2 4-2'></path>
      <line x1='9' y1='9' x2='9.01' y2='9'></line>
      <line x1='15' y1='9' x2='15.01' y2='9'></line>
    </svg>
  ),
}

const AppProfile = () => {
  const userdata = JSON.parse(localStorage.getItem("userDetails"));
  const [id, setId] = useState(userdata.user._id);
  const [imageUrl, setImageUrl] = useState("http://127.0.0.1:5173"+userdata.user.image_url);
  const [formData, setFormData] = useState({
    name: userdata.user.name || '',
    email: userdata.user.email || '',
    phone: userdata.user.phone || '',
    password: userdata.user.password || '',
    role: userdata.user.role || 'admin',
  });

  const handleChange = (e) => {
    console.log(imageUrl);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`http://127.0.0.1:5173/api/admins/${id}`, {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				password: formData.password,
			});
	
			// Update localStorage with the new user details
			const updatedUserDetails = {
				...userdata,
				user: {
					...userdata.user,
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
				}
			};
			localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};

  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('user_type', 'admin');
    formData.append('user_id', id); 
    formData.append('profilePic', selectedFile);

    try {
      const response = await axios.put('http://127.0.0.1:5173/api/dashboard/uploadProfilePic', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
         // Update localStorage with the new user details
         const updatedUserDetails = {
          ...userdata,
          user: {
              ...userdata.user,
              profile_url: response.data.imageUrl,
          }
      };
      localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));  
      setShowAlert(true);   
    } catch (error) {
        console.error('Error uploading profile picture', error);
        alert('Error uploading profile picture');
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="Admin" />
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <Tab.Container defaultActiveKey="Setting">
                    <Nav as="ul" className="nav nav-tabs">
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link to="#profile-settings" eventKey="Setting">
                          Account Settings
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane id="profile-settings" eventKey="Setting">
                        <div className="pt-3">
                          <div className="settings-form">
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="form-group mb-3 col-md-6">
                                  <label className="form-label">Email</label>
                                  <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group mb-3 col-md-6">
																	<label>Password</label>
																		<input
																				type="password"
																				className="form-control"
																				name="password"
																				value={formData.password}
																				onChange={handleChange}
																				placeholder="Enter Password"
																		/>
                                </div>
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="John Doe"
                                  className="form-control"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                  type="text"
                                  name="phone"
                                  placeholder="Phone"
                                  className="form-control"
                                  value={formData.phone}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="row">
                                <div className="form-group mb-3 col-md-6">
                                  <label className="form-label">Organization</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value="ScrapApp"
                                    readOnly
                                  />
                                </div>
                                <div className="form-group mb-3 col-md-6">
                                  <label className="form-label">Role</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.role==="inventory-manager"?("Inventory Manager"):("Super Admin")}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <button className="btn btn-primary" type="submit">
                                Update Profile Details
                              </button>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="card overflow-hidden">
                    <div
                      className="text-center p-5 overlay-box"
                      style={{ backgroundImage: `url(${bg5})` }}
                    >
                      <img
                        src={userdata.user.image_url === "" ? (profile) : (imageUrl)}
                        width="100"
                        className="img-fluid rounded-circle"
                        alt=""
                      />
                      <h3 className="mt-3 mb-0 text-white">{formData.name}</h3>
                    </div>
                    <div className="card-body">
                      <div className="row text-center">
                        <div className="col-6">
                          <div className="bgl-primary rounded p-3">
                            <h4 className="mb-0">Org</h4>
                            <small>Scrap App</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bgl-primary rounded p-3">
                            <h4 className="mb-0">Role</h4>
                            <small>{formData.role==="inventory-manager"?("Inventory Manager"):("Super Admin")}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer mt-0">
                        <div>
                          <form onSubmit={handleProfileSubmit}>
                              <div className="form-group">
                                  <input
                                      type="file"
                                      className="form-control"
                                      id="profilePic"
                                      accept=".jpeg, .jpg, .png"
                                      onChange={handleFileChange}
                                  />
                              </div>
                              <button type="submit" className="btn btn-primary btn-lg btn-block">
                                  Change Profile Picture
                              </button>
                          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert variant="primary" dismissible onClose={() => setShowAlert(false)}>
          {emojis.welcome}
            <strong>Success! </strong> Profile Picture uploaded...
        </Alert>
      )}
    </Fragment>
  );
};

export default AppProfile;
