import React, { useState } from "react";
import "./Invoice.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import html2pdf from "html2pdf.js";
import mysign from '../../../images/sign.jpg';

const GenerateInvoice = () => {
  const { data } = useParams();
  const parsedData = JSON.parse(decodeURIComponent(data));
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleSaveAsPDF = async () => {
    setIsButtonVisible(false);
    const element = document.getElementById("invoice");

    const opt = {
      margin: 1,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    await html2pdf().from(element).set(opt).save();
    setIsButtonVisible(true);
  };

  return (
    <div className="invoice" id="invoice">
      <div className="header-row">
        <div className="left-column">
          <h1>PURCHASE ORDER</h1>
        </div>
        <div className="right-column">
          <h2>{parsedData.companyName}</h2>
          <div>{parsedData.companySlogan}</div>
          <div>{parsedData.streetAddress}</div>
          <div>{parsedData.cityStateZip}</div>
          <div>Phone: {parsedData.phone}</div>
          <div>Email: {parsedData.email}</div>
        </div>
      </div>
      <table className="details-table">
        <thead>
          <tr>
            <th className="header-to">TO</th>
            <th className="header-ship-to">SHIP TO</th>
            <th className="header-po-number">P.O NUMBER</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="to">
              <div>{parsedData.purchaserName}</div>
              <div>{parsedData.purchaserCompanyName}</div>
              <div>{parsedData.purchaserStreetAddress}</div>
              <div>{parsedData.purchaserCityStateZip}</div>
              <div>Phone: {parsedData.purchaserPhone}</div>
              <div>Email: {parsedData.purchaserEmail}</div>
            </td>
            <td className="ship-to">
              <div>{parsedData.recipientName}</div>
              <div>{parsedData.recipientCompanyName}</div>
              <div>{parsedData.recipientStreetAddress}</div>
              <div>{parsedData.recipientCityStateZip}</div>
              <div>Phone: {parsedData.recipientPhone}</div>
              <div>Email: {parsedData.recipientEmail}</div>
            </td>
            <td className="po-number">
              <div>{parsedData.poNumber}</div>
              <div>{parsedData.poAdditionalInfo}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="order-table">
        <thead>
          <tr>
            <th>P.O Date</th>
            <th>Requisitioner</th>
            <th>Shipped Via</th>
            <th>F.O.B Point</th>
            <th>Terms</th>
          </tr>
        </thead>
        <tbody>
          {parsedData.poDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.poDate}</td>
              <td>{item.requisitioner}</td>
              <td>{item.shippedVia}</td>
              <td>{item.fobPoint}</td>
              <td>{item.terms}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="items-table">
        <thead>
          <tr>
            <th className="qty-column">Qty</th>
            <th className="unit-column">Unit</th>
            <th className="description-column">Description</th>
            <th className="unit-price-column">Unit Price</th>
            <th className="total-column">Total</th>
          </tr>
        </thead>
        <tbody>
          {parsedData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.qty}</td>
              <td>{item.unit}</td>
              <td>{item.description}</td>
              <td>{item.unitPrice}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals">
        <div className="notes">
          <ul className="bullet-list">
            <li>Please send two copies of your invoice.</li>
            <li>Enter this order in accordance with the prices, terms, delivery method, and specifications listed above.</li>
            <li>Please notify us immediately if you are unable to ship as specified.</li>
            <li>Send all correspondence to:</li>
          </ul>
          <div className="my-details">
            <div>{parsedData.yourName}</div>
            <div>{parsedData.streetAddress}</div>
            <div>{parsedData.cityStateZip}</div>
            <div>{parsedData.phoneNumber}</div>
            <div>{parsedData.faxNumber}</div>
          </div>
        </div>
        <div className="summary">
          <div>Sub Total</div>
          <div>Sales Tax</div>
          <div>Shipping & Handling</div>
          <div>Other</div>
          <div>Total</div>
        </div>
      </div>
      <div className="invoice-footer-sign">
        <img src={mysign} alt="Signature" className="signature-image" />
        <div></div>
      </div>
      <div className="invoice-footer">
        <div>Authorized by {parsedData.yourName}</div>
        <div>{parsedData.pickDate}</div>
      </div>
      {isButtonVisible && (
        <button onClick={handleSaveAsPDF} className="btn btn-primary btn-lg me-1 me-sm-3">
          Save as PDF
        </button>
      )}
    </div>
  );
};

export default GenerateInvoice;
