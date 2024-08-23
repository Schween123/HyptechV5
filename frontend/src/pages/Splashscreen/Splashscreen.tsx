import { Helmet } from "react-helmet";
import { Text, Img } from "../../components";
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SplashscreenPage: React.FC = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState<number | null>(null);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);
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

  // Function to capture an image from the video stream
  const captureImage = async (): Promise<Blob | null> => {
    if (!videoRef.current) return null;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
    return blob;
  };

  // Function to send the captured image to the server for face recognition
  const triggerFaceRecognition = async () => {
    const imageBlob = await captureImage();
    if (!imageBlob) return false;

    const formData = new FormData();
    formData.append('image', imageBlob, 'capture.jpg');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/recognize_face/', formData);
      return response.data.status === 'success';
    } catch (error) {
      console.error('Error during face recognition:', error);
      return false;
    }
  };

  // Poll sensor data and trigger face recognition if the distance threshold is met
  useEffect(() => {
    const interval = setInterval(async () => {
      if (detectionPaused || faceDetected) return; // Skip detection if paused or face already detected

      const currentDistance = await fetchSensorData();
      if (currentDistance !== null) {
        setDistance(currentDistance);
        if (currentDistance <= 91.44) {  // Check if the object is within the desired distance
          const isRecognized = await triggerFaceRecognition();  // Trigger face recognition
          if (isRecognized) {
            setFaceDetected(true);
            navigate('/greet1');  // Navigate to the greet page if face is recognized
          } else {
            console.log('Face not recognized');
          }
          setDetectionPaused(true);  // Pause detection for 5 seconds
          setTimeout(() => setDetectionPaused(false), 5000);  // Resume detection after 5 seconds
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, faceDetected, detectionPaused]);

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
