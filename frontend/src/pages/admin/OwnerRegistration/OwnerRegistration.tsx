import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Text, Heading, Img, Input } from "../../../components";
import { useNavigate } from 'react-router-dom';

export default function OwnerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    contactNumber: '',
    fingerprint: null, // State to hold fingerprint data
  });
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [fingerprintMessage, setFingerprintMessage] = useState<string | null>("Please place your finger on the sensor");
  const [isFingerprintReading, setIsFingerprintReading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formData.firstName && formData.lastName && formData.address && formData.contactNumber) {
      setShowCamera(true);
    } else {
      setShowCamera(false);
    }
  };

  const handleCapture = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      const imageBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
      if (imageBlob) {
        const imageUrl = URL.createObjectURL(imageBlob);
        setCapturedImageUrl(imageUrl);

        // Stop the camera
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
        setShowCamera(false);

        // Upload the image to the backend
        const uploadData = new FormData();
        const imageName = `${formData.firstName}.jpg`; // Use FirstName for the image file name
        uploadData.append('image', imageBlob, imageName);
        uploadData.append('firstName', formData.firstName);

        try {
          const response = await fetch('http://127.0.0.1:8000/api/adminfaceimages/', {
            method: 'POST',
            body: uploadData,
          });

          if (response.ok) {
            console.log('Image uploaded successfully');
            // Start fingerprint reading immediately after capturing the image
            startFingerprintReading();
          } else {
            console.error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    }
  };

  const startFingerprintReading = async () => {
    setIsFingerprintReading(true);
    setFingerprintMessage("Please place your finger on the sensor...");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/fingerprint_read/');
      const responseData = await response.json();

      if (response.ok) {
        setFingerprintMessage("Fingerprint registered successfully!");
        setFormData({ ...formData, fingerprint: responseData.fingerprint_data_base64 }); // Store fingerprint in formData
      } else {
        setFingerprintMessage("Failed to register fingerprint, please try again.");
      }
    } catch (error) {
      console.error('Error reading fingerprint:', error);
      setFingerprintMessage("Error reading fingerprint, please try again.");
    } finally {
      setIsFingerprintReading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.fingerprint) {
      console.warn('Fingerprint has not been registered yet.');
      return; // Prevent form submission if fingerprint is not registered
    }

    const imageName = `${formData.firstName}.jpg`;
    const imagePath = `/home/user/Faces/Admin/${imageName}`;  // Construct the image path

    const uploadData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      phone_number: formData.contactNumber,
      fingerprint: formData.fingerprint,
      face_image: imagePath,  // Include the image path
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/owners/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Owner registered successfully:', responseData);
        navigate('/bhregistration');
      } else {
        const errorData = await response.json();
        console.error('Failed to register owner:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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

    if (showCamera) {
      startCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [showCamera]);

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="w-full border border-solid border-cyan-800">
        <div className="flex h-[1024px] items-center justify-center bg-[url(/images/bg.png)] bg-cover bg-no-repeat py-[82px] md:h-auto md:py-5">
          <div className="container-xs mb-20 mt-[52px] flex justify-center px-[281px] md:p-5 md:px-5">
            <div className="flex w-[363px] md:w-[90%] flex-col items-center gap-[50px] rounded-[15px] bg-customgraybg-50 shadow-lg p-[30px] md:w-full sm:p-8">
              <div className="relative flex flex-col items-center gap-[46px] rounded-[15px] bg-gray-800_7f p-7 sm:p-5">
                <Heading as="h1" className="text-shadow-ts mt-[10px] tracking-[9.00px] !text-white">
                  Owner's profile
                </Heading>
                <form onSubmit={handleSubmit} className="flex md:flex-row flex-col items-start md:justify-between">
                  <div className="relative mt-[33px] flex w-[300px] h-[300px] flex-col items-center gap-8 md:w-auto md:mr-36">
                    <div className="relative w-full h-full">
                      <Img 
                        src={capturedImageUrl || "/images/face_holder.png"} 
                        alt="faceholder" 
                        className="object-cover w-full h-full" 
                      />
                      {showCamera && !capturedImageUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full bg-transparent border-4 border-red-500 rounded-lg flex items-center justify-center">
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button" // Prevents form submission on click
                              onClick={handleCapture}
                              className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded"
                            >
                              Capture
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <Img 
                        src="/images/fingerprint_holder.png" 
                        alt="fingerprint" 
                        className="" 
                      />
                      {fingerprintMessage && (
                        <p className="text-white mt-4">{fingerprintMessage}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex flex-col items-start self-stretch">
                      <Text size="md" as="p" className="!font-open-sans tracking-[2.50px] !text-white">
                        First Name
                      </Text>
                      <Input
                        shape="square"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="!text-white w-[400px] border-b-2 border-customColor1 !text-xl pb-[-25px] pt-[25px] mt-[-17px]"
                      />
                    </div>
                    <div className="mt-[58px] flex flex-col items-start self-stretch">
                      <Text size="md" as="p" className="!font-open-sans tracking-[2.50px] !text-white">
                        Last Name
                      </Text>
                      <Input
                        shape="square"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="!text-white w-[400px] border-b-2 border-customColor1 !text-xl pb-[-25px] pt-[25px] mt-[-17px]"
                      />
                    </div>
                    <div className="mt-[58px] flex flex-col items-start self-stretch">
                      <Text size="md" as="p" className="!font-open-sans tracking-[2.50px] !text-white">
                        Address
                      </Text>
                      <Input
                        shape="square"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="!text-white w-[400px] border-b-2 border-customColor1 !text-xl pb-[-25px] pt-[25px] mt-[-17px]"
                      />
                    </div>
                    <div className="mt-[58px] flex flex-col items-start self-stretch">
                      <Text size="md" as="p" className="!font-open-sans tracking-[2.50px] !text-white">
                        Contact Number
                      </Text>
                      <Input
                        shape="square"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="!text-white w-[400px] border-b-2 border-customColor1 !text-xl pb-[-25px] pt-[25px] mt-[-17px]"
                      />
                    </div>
                    <div className="mt-[30px] flex justify-end w-[54%] md:mr-0">
                      <button type="submit" className="bg-transparent border-none cursor-pointer">
                        <img src="/images/NxtBtn.png" alt="Next" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
