import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const globalStyles = `
  body, html {
    background-color: #C5C3C6; 
    height: 100%;
    margin: 0;
  }
  #root, .app {
    height: 100%;
  }

  @media (max-width: 768px) {
    .responsive-container {
      flex-direction: column;
      padding: 20px;
    }

    .responsive-box {
      width: 100%;
      margin-bottom: 20px;
    }

    .responsive-text {
      font-size: 1.5rem;
    }

    .responsive-button {
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
    }
  }
`;

export default function BoarderFaceRegistrationPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleButtonClick = () => {
    navigate('/billregistration'); // Adjust the path if needed
  };

  useEffect(() => {
    const startCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
        }
      }
    };

    startCamera();

    // Clean up the camera stream when the component is unmounted
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
        <style>{globalStyles}</style>
      </Helmet>
      <div className="relative flex flex-col items-center justify-center w-full h-full px-[20px] py-[30px]">
        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-8 text-center">Tenant Face Registration</h1>
        
        <div className="flex w-full max-w-5xl h-full gap-4">
          {/* Left side for camera feed */}
          <div className="flex flex-col items-center justify-center w-[45%] bg-white p-5 rounded-lg shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right side for info */}
          <div className="flex flex-col justify-center w-[45%] bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">User Information</h2>
            <div className="flex flex-col space-y-1 text-sm">
              <p><strong>Name:</strong> Swen Roy T. Labra Jr.</p>
              <p><strong>Gender:</strong> Male</p>
              <p><strong>Age:</strong> 18</p>
              <p><strong>Address:</strong> 123 Main Street, Cityville</p>
              <p><strong>Contact number:</strong> 09361213042</p>
              <p><strong>Course/Profession:</strong> Software Engineer</p>
              <p><strong>School/Company:</strong> Tech University / Tech Corp</p>
            </div>
          </div>
        </div>

        {/* Next button positioned in the upper right corner */}
        <button 
          onClick={handleButtonClick} 
          className="absolute top-4 right-4 bg-transparent border-none cursor-pointer">
          <img src="public/images/nxtbtn2.png" alt="Next" className="w-[50px] h-[50px]" />
        </button>
      </div>
    </>
  );
}