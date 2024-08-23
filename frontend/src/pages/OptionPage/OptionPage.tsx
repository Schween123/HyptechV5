import { useNavigate } from 'react-router-dom';

const OptionPage = () => {
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate('/dashboard'); // Replace with actual admin page route
  };

  const goToBoarder = () => {
    navigate('/boarderprofile'); // Replace with actual boarder page route
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={goToAdmin} className="m-2 p-4 bg-blue-500 text-white rounded">
        Admin
      </button>
      <button onClick={goToBoarder} className="m-2 p-4 bg-green-500 text-white rounded">
        Boarder
      </button>
    </div>
  );
};

export default OptionPage;
