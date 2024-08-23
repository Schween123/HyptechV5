import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../../components";
import { useNavigate } from 'react-router-dom';

export default function BHRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bhname: '',
    bhaddress: '',
    bhrooms: '',
    owner: 1 // Assuming you have an owner with ID 1, update as necessary
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/boardinghouses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bh_name: formData.bhname,
          address: formData.bhaddress,
          number_of_rooms: formData.bhrooms,
          owner: formData.owner // Include the owner field
        })
      });

      if (response.ok) {
        navigate('/bhinfo');
      } else {
        const errorData = await response.json();
        console.error('Failed to register boarding house:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="w-full border border-cyan-800">
        <div className="flex min-h-screen items-center justify-center bg-[url('/public/images/bg.png')] bg-cover bg-no-repeat p-5">
          <div className="w-[647px] max-w-full rounded-lg bg-customgraybg-50 shadow-lg p-8">
            <Heading
              size="s"
              as="h1"
              className="text-white text-xl md:text-2xl text-center leading-tight md:leading-snug tracking-wide"
            >
              Register your Boarding House
            </Heading>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col">
                  <Text size="md" as="p" className="!font-open-sans tracking-wide text-white mb-1 pb-2 pt-2">
                    Name
                  </Text>
                  <input
                    name="bhname"
                    className="w-full border-b-2 border-customColor1 text-2xl bg-transparent text-white"
                    value={formData.bhname}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <Text size="md" as="p" className="!font-open-sans tracking-wide text-white mb-1 pb-2 pt-2">
                    Address
                  </Text>
                  <input
                    name="bhaddress"
                    className="w-full border-b-2 border-customColor1 bg-transparent text-white text-2xl"
                    value={formData.bhaddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <Text size="md" as="p" className="!font-open-sans tracking-wide text-white mb-1 pb-2 pt-2">
                    Number of Rooms
                  </Text>
                  <input
                    name="bhrooms"
                    className="w-full border-b-2 border-customColor1 bg-transparent text-white text-2xl"
                    value={formData.bhrooms}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" className="p-2 bg-transparent border-none cursor-pointer">
                  <img src="/images/NxtBtn.png" alt="Next" className="h-15 w-15" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
