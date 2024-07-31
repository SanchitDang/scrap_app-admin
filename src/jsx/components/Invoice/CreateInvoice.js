import React from 'react';
import { useForm } from 'react-hook-form';
import './Invoice.css';

const EnterInvoiceDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Handle form submission
        console.log(data);
    };

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row mb-4">
                                    <div className="col-xl-12">
                                        <h4 className="fs-24 font-w800">TO</h4>
                                        <div className="form-group mb-3 invoice">
                                            <label>Purchaser Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Purchaser Name"
                                                {...register('purchaserName', { required: 'Purchaser Name is required' })}
                                            />
                                            {errors.purchaserName && <p className="error-text">{errors.purchaserName.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Company Name"
                                                {...register('purchaserCompanyName', { required: 'Company Name is required' })}
                                            />
                                            {errors.purchaserCompanyName && <p className="error-text">{errors.purchaserCompanyName.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Street Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Street Address"
                                                {...register('purchaserStreetAddress', { required: 'Street Address is required' })}
                                            />
                                            {errors.purchaserStreetAddress && <p className="error-text">{errors.purchaserStreetAddress.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>City, State, Zip Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter City, State, Zip Code"
                                                {...register('purchaserCityStateZip', { required: 'City, State, Zip Code is required' })}
                                            />
                                            {errors.purchaserCityStateZip && <p className="error-text">{errors.purchaserCityStateZip.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Phone"
                                                {...register('purchaserPhone', { 
                                                    required: 'Phone number is required',
                                                    pattern: {
                                                        value: /^[0-9\s\-\(\)]+$/,
                                                        message: 'Invalid phone number'
                                                    }
                                                })}
                                            />
                                            {errors.purchaserPhone && <p className="error-text">{errors.purchaserPhone.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter Email"
                                                {...register('purchaserEmail', { 
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                            />
                                            {errors.purchaserEmail && <p className="error-text">{errors.purchaserEmail.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-xl-12">
                                        <h4 className="fs-24 font-w800">SHIP TO</h4>
                                        <div className="form-group mb-3 invoice">
                                            <label>Recipient Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Recipient Name"
                                                {...register('recipientName', { required: 'Recipient Name is required' })}
                                            />
                                            {errors.recipientName && <p className="error-text">{errors.recipientName.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Company Name"
                                                {...register('recipientCompanyName', { required: 'Company Name is required' })}
                                            />
                                            {errors.recipientCompanyName && <p className="error-text">{errors.recipientCompanyName.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Street Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Street Address"
                                                {...register('recipientStreetAddress', { required: 'Street Address is required' })}
                                            />
                                            {errors.recipientStreetAddress && <p className="error-text">{errors.recipientStreetAddress.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>City, State, Zip Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter City, State, Zip Code"
                                                {...register('recipientCityStateZip', { required: 'City, State, Zip Code is required' })}
                                            />
                                            {errors.recipientCityStateZip && <p className="error-text">{errors.recipientCityStateZip.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Phone"
                                                {...register('recipientPhone', { 
                                                    required: 'Phone number is required',
                                                    pattern: {
                                                        value: /^[0-9\s\-\(\)]+$/,
                                                        message: 'Invalid phone number'
                                                    }
                                                })}
                                            />
                                            {errors.recipientPhone && <p className="error-text">{errors.recipientPhone.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter Email"
                                                {...register('recipientEmail', { 
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                            />
                                            {errors.recipientEmail && <p className="error-text">{errors.recipientEmail.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-xl-12">
                                        <h4 className="fs-24 font-w800">P.O NUMBER</h4>
                                        <div className="form-group mb-3 invoice">
                                            <label>P.O Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter P.O Number"
                                                {...register('poNumber', { required: 'P.O Number is required' })}
                                            />
                                            {errors.poNumber && <p className="error-text">{errors.poNumber.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Additional Information</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Enter additional information about the P.O Number"
                                                rows="3"
                                                {...register('poAdditionalInfo', { required: 'Additional information is required' })}
                                            ></textarea>
                                            {errors.poAdditionalInfo && <p className="error-text">{errors.poAdditionalInfo.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnterInvoiceDetails;
