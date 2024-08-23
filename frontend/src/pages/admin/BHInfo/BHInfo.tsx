import { Helmet } from "react-helmet";
import { Button, Heading } from "../../../components";
import BHInfoRoom from "../../../components/BHInfoRoom/bhInfoRoom.tsx";
import { Suspense, useState } from 'react';
import DoneBHRegistration from "../../../components/DoneBHRegistration/DoneBHRegistration.tsx";

const globalStyles = `
  body, html {
    background-color: #C5C3C6; 
    height: 100%;
    margin: 0;
  }
  #root, .app {
    height: 100%;
  }
`;

const data = [
  { roomnumber: "Room 1" },
  { roomnumber: "Room 2" },
  { roomnumber: "Room 3" },
  { roomnumber: "Room 4" },
  { roomnumber: "Room 5" },
  { roomnumber: "Room 6" },
  { roomnumber: "Room 7" },
  { roomnumber: "Room 8" },
  { roomnumber: "Room 9" },
  { roomnumber: "Room 10" },
  { roomnumber: "Room 11" },
  { roomnumber: "Room 12" },
];

export default function BHInfoPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleDoneClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
        <style>{globalStyles}</style>
      </Helmet>
      <div className="flex w-full flex-col items-center justify-center border border-solid border-white-A700 py-[47px] md:py-5">
        <div className="container-xs flex flex-col items-start p-5">
          <div className="flex flex-col items-start gap-2">
            <Heading as="h1" className="text-xl md:text-2xl lg:text-3xl tracking-[9.00px] !text-black-900">
              BOARDING HOUSE NAME
            </Heading>
            <Heading size="xs" as="h2" className="text-sm md:text-lg lg:text-xl tracking-[7.00px] !text-cyan-800">
              Room Information
            </Heading>
          </div>
          <div className="mt-[86px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[27px] w-[94%]">
            <Suspense fallback={<div>Loading feed...</div>}>
              {data.map((d, index) => (
                <BHInfoRoom {...d} key={"bhinfo" + index} />
              ))}
            </Suspense>         
          </div>
          <Button
            color="blue_gray_100"
            shape="square"
            className="self-end mr-[31px] mt-12 px-5 py-2 text-sm sm:text-base md:min-w-[193px] md:text-lg lg:text-xl border-[5px] border-solid border-cyan-800 font-montserrat font-semibold md:mr-0"
            onClick={handleDoneClick}
          >
            DONE
          </Button>   
        </div>
      </div>
      {showPopup && <DoneBHRegistration onClose={handleClosePopup} />}
    </>
  );
}
