// src/pages/PayNow.tsx
import { FC, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Text} from "../../../components";
import PayNowButtonRowOne from "../../../components/PayNowButtonRowOne/PayNowButtonRowOne";
import PaymentMethodModal from "../../../components/PaymentMethodModal/PaymentMethodModal";
import { Suspense } from "react";
import { useNavigate } from 'react-router-dom';

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

const PayNow: FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/boarderprofile'); // Adjust the path if needed
  };


  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentSelect = (method: string) => {
    console.log(`Selected payment method: ${method}`);
    setShowPaymentModal(false);
    // Handle other payment method actions here
  };

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
        <style>{globalStyles}</style>
      </Helmet>
      <div className="w-full border border-solid ">
        <div className="flex flex-col gap-[47px]">
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-[34px] self-stretch bg-customcyan p-[47px] md:p-5 sn:flex-col h-[180px]">
            <button onClick={handleButtonClick} className="p-5 cursor-pointer">
                <img src="/images/backbtn.png" alt="arrowleft" />
              </button>
              <Text size="3xl" as="p" className="font-open-sans mb-1 self-end tracking-[4.50px] !text-white sm:mb-0 sm:self-auto">
                Amount to Pay
              </Text>
            </div>
            <div className="container-xs flex flex-col items-center px-[129px] md:p-5 md:px-5">
              <Text size="s" as="p" className="tracking-[2.50px] text-customgraybg font-open-sans">
                Please select the months consecutively, starting from the nearest month
              </Text>
            </div>
          </div>
          <div>
            <div className="relative mt-[-35px] flex flex-col">
              <Suspense fallback={<div>Loading feed...</div>}>
                {[...Array(2)].map((_, index) => (
                  <PayNowButtonRowOne key={"paynowbutton" + index} />
                ))}
              </Suspense>
            </div>
          </div>
          <div>
            <div className="fixed bottom-0 left-0 right-0 leading-normal flex flex-col items-center justify-center border border-solid border-gray-400 bg-gray-300 p-2.5 h-[130px]">
              <div className="flex w-91% flex-col items-end gap-0 md:w-full">
                <div className="flex w-32% flex-wrap items-center justify-end gap-5 md:w-full mt-[-20px]">
                  <Text size="md" as="p" className="self-end tracking-2.50px text-black-900 mt-2 font-open-sans">
                    Amount Payable:
                  </Text>
                  <Text as="p" className="tracking-3.00px !text-customcyan mt-2 font-open-sans">
                    ₱ 000.00
                  </Text>
                </div>
              </div>
              <div className="container-xs flex justify-center px-[164px] mt-2">
                <Button
                  size="sm"
                  shape="square"
                  className="w-[946px] md:w-full h-[74px] tracking-[4.50px] md:text-[41px] sm:text-[35px] bg-customcyan !text-white font-open-sans"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <PaymentMethodModal onClose={() => setShowPaymentModal(false)} onSelect={handlePaymentSelect} />
      )}
    </>
  );
};

export default PayNow;
