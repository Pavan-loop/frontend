import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/bill.css';

const Billing = () => {
  const { patientId } = useParams();
  const [billingData, setBillingData] = useState(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/billing/${patientId}`);
        setBillingData(res.data);
      } catch (err) {
        console.error('Error fetching billing data:', err.message);
      }
    };

    fetchBillingData();
  }, [patientId]);

  if (!billingData) return <div>Loading...</div>;

  const { patient, pricing, total } = billingData;

  return (
    <div className="bill-container">
      <div className="bill-board">
        <div className="bill-to">
          <div className="bill-left-side">
            <div className="bill-heading">
              <h2>INVOICE</h2>
            </div>
            <div className="bill-cus-details">
              <span className='billing-to'>Billing To: </span>
              <h3>{`${patient.firstName} ${patient.lastName}`}</h3>
              <p>{`${patient.age}, ${patient.gender} / ${patient.email}`}</p>
            </div>
          </div>

          <div className="hos-details">
            <div className="invoice-no">
              <span className="in-no">Invoice No</span>
              <h2>#005DF</h2>
            </div>
            <div className="iss-date">
              <p className='gray'>Issued on</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bill-pres-details">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th className='bill-price'>Price</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((item, index) => (
                <tr key={index}>
                  <td>{item.serviceName}</td>
                  <td className='bill-aprice'>{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bill-total">
          <div className="col-1">
            <p>Total (Rupees)</p>
            <h1>{total.toFixed(2)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
