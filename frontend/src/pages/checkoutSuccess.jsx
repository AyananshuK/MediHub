import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Thank you. Your payment has been processed successfully.
        </p>
        <div className="text-center">
          <Link to="/home" className='px-6 bg-blue-600 rounded-xl text-white font-semibold py-3'>Go Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;