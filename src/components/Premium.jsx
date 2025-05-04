import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {

    const handleClickButton = async (membership) => {
        try {
       const order = await axios.post(BASE_URL + `/payment/create'`, {
            membershipType: membership,
        }, { withCredentials: true });
        const options = {
            key: order.key, 
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: order.currency,
            name: 'DevTinder',
            description: 'Test Transaction',
            order_id: order.orderId, // This is the order_id created in the backend

            prefill: {
              firstName: order.notes.firstName,
                lastName: order.notes.lastName,
              emailId: order.notes.emailId
              
            },
            theme: {
              color: '#F37254'
            },
          };
        const rzp = new window.Razorpay(options);
        rzp.open();
        } catch (error) {
          console.log(error);
        }
      };

    return (
      <div className="m-10">
        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-10">
          {/* Silver Membership Card */}
          <div className="card bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg shadow-lg p-6 w-full md:w-1/3">
            <h1 className="text-3xl font-bold mb-4 text-center">Silver Membership</h1>
            <ul className="list-disc list-inside mb-6">
              <li>Access to all features</li>
              <li>Priority support</li>
              <li>Exclusive content</li>
              <li>Early access to new features</li>
              <li>Discounts on future purchases</li>
            </ul>
            <button className="btn btn-secondary w-full"onClick={() => handleClickButton("silver")}>Buy Silver</button>
          </div>
  
          {/* Divider */}
          <div className="divider divider-horizontal hidden md:block">OR</div>
  
          {/* Gold Membership Card */}
          <div className="card bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg shadow-lg p-6 w-full md:w-1/3">
            <h1 className="text-3xl font-bold mb-4 text-center">Gold Membership</h1>
            <ul className="list-disc list-inside mb-6">
              <li>Access to all features</li>
              <li>Priority support</li>
              <li>Exclusive content</li>
              <li>Early access to new features</li>
              <li>Discounts on future purchases</li>
              <li>Access to premium content</li>
            </ul>
            <button className="btn btn-primary w-full" onClick={() => handleClickButton("gold")}>Buy Gold</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Premium;