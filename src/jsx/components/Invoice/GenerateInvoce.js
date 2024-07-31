import React from "react";
import "./Invoice.css";
import html2pdf from "html2pdf.js";

const GenerateInvoice = () => {
  const handleSaveAsPDF = () => {
    const element = document.getElementById("invoice");
    
    const opt = {
      margin: 1,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="invoice" id="invoice">
      <div className="header-row">
        <div className="left-column">
          <h1>PURCHASE ORDER</h1>
        </div>
        <div className="right-column">
          <h2>COMPANY NAME</h2>
          <p>[company slogan]</p>
          <p>[street address here]</p>
          <p>[city, state, zip code]</p>
          <p>Phone: (111) 222 3333</p>
          <p>Email: email@company.com</p>
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
              <p>[PURCHASER NAME]</p>
              <p>[Company Name]</p>
              <p>[street address here]</p>
              <p>[city, state, zip code]</p>
              <p>Phone: (111) 222 3333</p>
              <p>Email: email@company.com</p>
            </td>
            <td className="ship-to">
              <p>[RECIPIENT NAME]</p>
              <p>[Company Name]</p>
              <p>[street address here]</p>
              <p>[city, state, zip code]</p>
              <p>Phone: (111) 222 3333</p>
              <p>Email: email@company.com</p>
            </td>
            <td className="po-number">
              <p>[P.O. number]</p>
              <p>
                [The P.O. number must appear on all related correspondence,
                shipping papers, and invoices]
              </p>
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
          <tr>
            <td>10.11.2024</td>
            <td>abc</td>
            <td>def</td>
            <td>ghi</td>
            <td>jkl</td>
          </tr>
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
          <tr>
            <td>1</td>
            <td>10</td>
            <td>abc</td>
            <td>500</td>
            <td>600</td>
          </tr>
        </tbody>
      </table>
      <div className="totals">
        <div className="notes">
          <p>Please send two copies of your invoice.</p>
          <p>
            Enter this order in accordance with the prices, terms, delivery
            method, and specifications listed above.
          </p>
          <p>
            Please notify us immediately if you are unable to ship as specified.
          </p>
          <p>Send all correspondence to:</p>
          <p>[Your name]</p>
          <p>[Street Address]</p>
          <p>[City, ST ZIP Code]</p>
          <p>[Phone Number]</p>
          <p>[Fax Number]</p>
        </div>
        <div className="summary">
          <p>Sub Total</p>
          <p>Sales Tax</p>
          <p>Shipping & Handling</p>
          <p>Other</p>
          <p>Total</p>
        </div>
      </div>
      <div className="footer">
        <p>Authorized by [Your Name]</p>
        <p>Pick the Date</p>
      </div>
      <button onClick={handleSaveAsPDF}>Save as PDF</button>
    </div>
  );
};

export default GenerateInvoice;
