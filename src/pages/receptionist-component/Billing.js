
import '../../style/bill.css'

const Billing = ({patient}) => {
  return(
    <div className="bill-container">
      <div className="bill-board">

        <div className="bill-to">
        <div className="bill-left-side">
        <div className="bill-heading">
          <h2>INVOICE</h2>
        </div>
        <div className="bill-cus-details">
          <span className='billing-to'>Billing To: </span>
          <h3>PAVAN</h3>
          <p>43, Male / pavanprashanth112@gmail.com</p>
        </div>
        </div>

        <div className="hos-details">
          <div className="invoice-no">
            <span className="in-no">Invoice No</span>
            <h2>#005DF</h2>
          </div>
          <div className="iss-date">
            <p className='gray'>Issued on</p>
            <p>December 7, 2024</p>
          </div>
        </div>
        </div>

        <div className="bill-pres-details">
          <table>
            <tr>
              <th>Medicine Name</th>
              <th className='bill-price'>Price</th>
            </tr>
            <tr>
              <td>General Checkup</td>
              <td className='bill-aprice'>350.00</td>
            </tr>
            <tr>
              <td>XRay</td>
              <td className='bill-aprice'>850.00</td>
            </tr>
          </table>
        </div>

        <div className="bill-total">
          <div className="col-1">
            <p>Total (Rupees)</p>
            <h1>1200.00</h1>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Billing;