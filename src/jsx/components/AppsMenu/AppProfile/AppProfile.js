import axios from 'axios';
import React, { Fragment, useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import PageTitle from "../../../layouts/PageTitle";

import bg5 from "../../../../images/big/img5.jpg";
import profile from "../../../../images/profile/profile.png";

const AppProfile = () => {
  const userdata = JSON.parse(localStorage.getItem("userDetails"));
  const [id, setId] = useState(userdata.user._id);
  const [formData, setFormData] = useState({
    name: userdata.user.name || '',
    email: userdata.user.email || '',
    phone: userdata.user.phone || '',
    password: userdata.user.password || '',
    role: userdata.user.role || 'admin',
  });

  const handleChange = (e) => {
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
                                    value="Super Admin"
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
                        src={profile}
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
                            <small>Super Admin</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer mt-0">
                      <button className="btn btn-primary btn-lg btn-block">
                        Change Profile Picture
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppProfile;
