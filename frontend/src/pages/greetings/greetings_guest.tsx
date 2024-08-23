import React from 'react';
import { useNavigate } from 'react-router-dom';

const GreetGuest: React.FC = () => {
  const navigate = useNavigate();

  const handleRoomInfoClick = () => {
    navigate('/roomshow');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100 p-5">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Hello, guest! What can I do for you?</h1>
      <div className="max-w-md">
        <button 
          onClick={handleRoomInfoClick}
          className="bg-blue-500 text-white py-3 px-6 rounded shadow hover:bg-blue-600 transition duration-200 w-full"
        >
          Room Info
        </button>
      </div>
    </div>
  );
};

export default GreetGuest;
