import React from 'react';
import { useNavigate } from 'react-router-dom';

const GreetAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleBoardingHouseInfoClick = () => {
    navigate('/roominfo');
  };

  const handleAdminDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100 p-5">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Hello, admin! What can I do for you?</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <button 
          onClick={handleBoardingHouseInfoClick}
          className="bg-blue-500 text-white py-3 px-6 rounded shadow hover:bg-blue-600 transition duration-200"
        >
          Boarding House Info
        </button>
        <button 
          onClick={handleAdminDashboardClick}
          className="bg-green-500 text-white py-3 px-6 rounded shadow hover:bg-green-600 transition duration-200"
        >
          Admin Dashboard
        </button>
      </div>
    </div>
  );
};

export default GreetAdmin;
