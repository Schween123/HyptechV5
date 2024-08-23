import React from 'react';
import { useNavigate } from 'react-router-dom';

const GreetTenants: React.FC = () => {
  const navigate = useNavigate();

  const handlePayNowClick = () => {
    navigate('/paynow');
  };

  const handleTransactionHistoryClick = () => {
    navigate('/transactions');
  };

  const handleToBePaidClick = () => {
    navigate('/billdetails');
  };

  const handleRoomInfoClick = () => {
    navigate('/roomshow');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100 p-5">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Hello, tenant! What can I do for you?</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <button 
          onClick={handlePayNowClick}
          className="bg-blue-500 text-white py-3 px-6 rounded shadow hover:bg-blue-600 transition duration-200"
        >
          Pay Now
        </button>
        <button 
          onClick={handleTransactionHistoryClick}
          className="bg-green-500 text-white py-3 px-6 rounded shadow hover:bg-green-600 transition duration-200"
        >
          Transaction History
        </button>
        <button 
          onClick={handleToBePaidClick}
          className="bg-yellow-500 text-white py-3 px-6 rounded shadow hover:bg-yellow-600 transition duration-200"
        >
          To be Paid
        </button>
        <button 
          onClick={handleRoomInfoClick}
          className="bg-purple-500 text-white py-3 px-6 rounded shadow hover:bg-purple-600 transition duration-200"
        >
          Room Info
        </button>
      </div>
    </div>
  );
};

export default GreetTenants;
