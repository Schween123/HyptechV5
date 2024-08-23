import { Helmet } from "react-helmet";
import { Text, Img } from "../../components";
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SplashscreenPage: React.FC = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState<number | null>(null);
  const [detectionPaused, setDetectionPaused] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize the webcam stream when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: {} }).then(stream => {
        videoRef.current!.srcObject = stream;
      });
    }
  }, []);

  // Function to fetch the sensor data
  const fetchSensorData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/sensor/');
      return response.data.distance;
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      return null;
    }
  };

  // Poll sensor data
  useEffect(() => {
    const interval = setInterval(async () => {
      if (detectionPaused) return; // Skip detection if paused

      const currentDistance = await fetchSensorData();
      if (currentDistance !== null) {
        setDistance(currentDistance);
        if (currentDistance <= 91.44) { // Check if the object is within 3 feet
          console.log('Object detected within range:', currentDistance);
          navigate('/home'); // Navigate to /home when detected
          setDetectionPaused(true); // Pause detection for 5 seconds
          setTimeout(() => setDetectionPaused(false), 5000); // Resume detection after 5 seconds
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [detectionPaused, navigate]);

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex h-screen w-full items-center justify-center bg-white-A700 bg-[url(/public/images/bg.png)] bg-cover bg-no-repeat">
        <div className="flex flex-col items-center justify-center h-full w-full p-5">
          <div className="relative flex flex-col items-center justify-center h-full w-full">
            <Img
              src="images/logo.png"
              alt="logoone"
              className="max-h-[50%] max-w-[50%] object-contain"
            />
            <Text
              size="2xl"
              as="p"
              className="mt-6 !text-with-shadow !font-bakbak-one tracking-[12.40px] !text-customgray text-center"
            >
              Boarding House Name
            </Text>
            {distance !== null && (
              <Text
                size="lg"
                as="p"
                className="mt-6 !text-with-shadow !font-bakbak-one tracking-[8.40px] !text-customgray text-center"
              >
                Distance: {distance.toFixed(2)} cm
              </Text>
            )}
            <video ref={videoRef} autoPlay muted style={{ display: 'none' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashscreenPage;

