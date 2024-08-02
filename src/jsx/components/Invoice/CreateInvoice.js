import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './Invoice.css';

const EnterInvoiceDetails = () => {

    const { register, control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            items: [{ qty: '', unit: '', description: '', unitPrice: '', total: '' }],
            poDetails: [{ poDate: '', requisitioner: '', shippedVia: '', fobPoint: '', terms: '' }]
        }
    });
    const history = useHistory();

    const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
        control,
        name: 'items'
    });

    const { fields: poFields, append: appendPo, remove: removePo } = useFieldArray({
        control,
        name: 'poDetails'
    });

    const onSubmit = async (data) => {
        const updatedData = {
            ...data,
            items: data.items.map(item => ({
                ...item,
                total: (item.qty * item.unitPrice).toFixed(2)
            }))
        };
        console.log(updatedData);  
        const encodedData = encodeURIComponent(JSON.stringify(updatedData));
        history.push(`/generate-invoice/${encodedData}`);
    };

    const calculateTotal = (unitPrice, qty) => {
        const total = unitPrice * qty;
        return total.toFixed(2);
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
                                        <h4 className="fs-24 font-w800">COMPANY</h4>
                                        <div className="form-group mb-3 invoice">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Company Name"
                                                {...register('companyName', { required: 'Company Name is required' })}
                                            />
                                            {errors.companyName && <p className="error-text">{errors.companyName.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Company Slogan</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Company Slogan"
                                                {...register('companySlogan')}
                                            />
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Street Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Street Address"
                                                {...register('streetAddress', { required: 'Street Address is required' })}
                                            />
                                            {errors.streetAddress && <p className="error-text">{errors.streetAddress.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>City, State, Zip Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter City, State, Zip Code"
                                                {...register('cityStateZip', { required: 'City, State, Zip Code is required' })}
                                            />
                                            {errors.cityStateZip && <p className="error-text">{errors.cityStateZip.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Phone Number"
                                                {...register('phone', { required: 'Phone number is required' })}
                                            />
                                            {errors.phone && <p className="error-text">{errors.phone.message}</p>}
                                        </div>
                                        <div className="form-group mb-3 invoice">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter Email Address"
                                                {...register('email', { required: 'Email is required' })}
                                            />
                                            {errors.email && <p className="error-text">{errors.email.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-xl-12">
                                        <h4 className="fs-24 font-w800">YOUR DETAILS</h4>
                                        <div className="form-group mb-3 invoice">
                                            <label>Your Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Name"
                                                {...register('yourName', { required: 'Your Name is required' })}
                                            />
                                            {errors.yourName && <p className="error-text">{errors.yourName.message}</p>}
                                        </div>

                                        <div className="form-group mb-3 invoice">
                                            <label>Street Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Street Address"
                                                {...register('streetAddress', { required: 'Street Address is required' })}
                                            />
                                            {errors.streetAddress && <p className="error-text">{errors.streetAddress.message}</p>}
                                        </div>

                                        <div className="form-group mb-3 invoice">
                                            <label>City, ST ZIP Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter City, ST ZIP Code"
                                                {...register('cityStateZip', { required: 'City, ST ZIP Code is required' })}
                                            />
                                            {errors.cityStateZip && <p className="error-text">{errors.cityStateZip.message}</p>}
                                        </div>

                                        <div className="form-group mb-3 invoice">
                                            <label>Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="Enter Phone Number"
                                                {...register('phoneNumber', { required: 'Phone Number is required' })}
                                            />
                                            {errors.phoneNumber && <p className="error-text">{errors.phoneNumber.message}</p>}
                                        </div>

                                        <div className="form-group mb-3 invoice">
                                            <label>Fax Number</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="Enter Fax Number"
                                                {...register('faxNumber')}
                                            />
                                            {errors.faxNumber && <p className="error-text">{errors.faxNumber.message}</p>}
                                        </div>

                                        <div className="form-group mb-3 invoice">
                                            <label>Pick Date</label>
                                            <input
                                                size="16"
                                                type="date"
                                                className="form-control"
                                                {...register('pickDate', { required: 'Date is required' })}
                                            />
                                            {errors.pickDate && <p className="error-text">{errors.pickDate.message}</p>}
                                        </div>

                                    </div>
                                </div>

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
                                                        value: /^\+?[0-9\s\-\(\)]+$/,
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
                                                        value: /^\+?[0-9\s\-\(\)]+$/,
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

                                <div className="row mb-4">
                                    <div className="col-xl-12">
                                        <h4 className="fs-24 font-w800 mt-4">Items</h4>
                                        {itemFields.map((item, index) => (
                                            <div key={item.id} className="item-row">
                                                <div className="form-group mb-3 invoice">
                                                    <label>Qty</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Qty"
                                                        {...register(`items.${index}.qty`, { required: 'Quantity is required' })}
                                                    />
                                                    {errors.items?.[index]?.qty && <p className="error-text">{errors.items[index].qty.message}</p>}
                                                </div>
                                                <div className="form-group mb-3 invoice">
                                                    <label>Unit</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Unit"
                                                        {...register(`items.${index}.unit`, { required: 'Unit is required' })}
                                                    />
                                                    {errors.items?.[index]?.unit && <p className="error-text">{errors.items[index].unit.message}</p>}
                                                </div>
                                                <div className="form-group mb-3 invoice">
                                                    <label>Description</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Description"
                                                        {...register(`items.${index}.description`)}
                                                    />
                                                </div>
                                                <div className="form-group mb-3 invoice">
                                                    <label>Unit Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Unit Price"
                                                        {...register(`items.${index}.unitPrice`, { required: 'Unit Price is required' })}
                                                    />
                                                    {errors.items?.[index]?.unitPrice && <p className="error-text">{errors.items[index].unitPrice.message}</p>}
                                                </div>
                                                <div className="form-group mb-3 invoice">
                                                    <label>Total</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Total"
                                                        value={(watch(`items.${index}.unitPrice`) * watch(`items.${index}.qty`)).toFixed(2)}
                                                        readOnly
                                                    />
                                                </div>
                                                <button type="button" onClick={() => removeItem(index)}>Remove</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => appendItem({ qty: '', unit: '', description: '', unitPrice: '', total: '' })}>
                                            Add More Items
                                        </button>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-xl-12">
                                        <h4 className="fs-24 font-w800 mt-4">P.O. Details</h4>
                                        {poFields.map((po, index) => (
                                            <div key={po.id} className="po-row">
                                                <div className="form-group mb-3 invoice">
                                                    <label>P.O Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="P.O Date"
                                                        {...register(`poDetails.${index}.poDate`, { required: 'P.O Date is required' })}
                                                    />
                                                    {errors.poDetails?.[index]?.poDate && <p className="error-text">{errors.poDetails[index].poDate.message}</p>}
                                                </div>
                                                <div className="form-group mb-3 invoice">
                                                    <label>Requisitioner</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Requisitioner"
                                                        {...register(`poDetails.${index}.requisitioner`, { required: 'Requisitioner is required' })}
                                                    />
                                                    {errors.poDetails?.[index]?.requisitioner && <p className="error-text">{errors.poDetails[index].requisitioner.message}</p>}
                                                </div>
                                                <div className="form-group mb-3 invoice">
                                                    <label>Shipped Via</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Shipped Via"
                                                        {...register(`poDetails.${index}.shippedVia`, { required: 'Shipped Via is required' })}
                                                    />
                                                    {errors.poDetails?.[index]?.shippedVia && <p className="error-text">{errors.poDetails[index].shippedVia.message}</p>}
                                                </div>
                                                <div className="form-group mb-3 invoice">
                                                    <label>F.O.B Point</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="F.O.B Point"
                                                        {...register(`poDetails.${index}.fobPoint`, { required: 'F.O.B Point is required' })}
                                                    />
                                                    {errors.poDetails?.[index]?.fobPoint && <p className="error-text">{errors.poDetails[index].fobPoint.message}</p>}
                                                </div>
                                                <div className="form-group mb-3 invoice">
                                                    <label>Terms</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Terms"
                                                        {...register(`poDetails.${index}.terms`, { required: 'Terms are required' })}
                                                    />
                                                    {errors.poDetails?.[index]?.terms && <p className="error-text">{errors.poDetails[index].terms.message}</p>}
                                                </div>
                                                <button type="button" onClick={() => removePo(index)}>Remove</button>
                                            </div>
                                        ))}
                                        
                                        <button type="button" onClick={() => appendPo({ poDate: '', requisitioner: '', shippedVia: '', fobPoint: '', terms: '' })}>
                                            Add More P.O. Details
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">Create Invoice</button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnterInvoiceDetails;
