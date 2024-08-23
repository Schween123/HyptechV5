import { Helmet } from "react-helmet";
import { Text, Heading } from "../../../components";
import BillDetail from "../../../components/BillDetail/BillDetail";
import { Suspense } from "react";
import TotalAmount from "../../../components/TotalAmount/TotalAmount";
import { totalAmount, bill } from "../../../components/TotalAmount/TotalAmount";
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


export default function BillDetailsPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/boarderprofile'); // Adjust the path if needed
  };
return (
    <>
        <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
        <style>{globalStyles}</style>
        </Helmet>
        <div className="min-h-screen w-full">
        <div className="pb-[347px] md:pb-5">
          <div className="mt-[-55px]">
            <div className="flex flex-col items-start justify-center gap-[63px] bg-customcyan py-[47px] md:py-5 sm:gap-[31px]">
              <div className="flex items-center gap-[34px] self-stretch bg-customcyan p-[47px] md:p-5 sn:flex-col h-[180px]">
              <button onClick={handleButtonClick} className="p-5 cursor-pointer">
                <img src="/images/backbtn.png" alt="arrowleft" />
              </button>
                <Text size="3xl" as="p" className="mb-1 self-end tracking-[4.50px] !text-white sm:mb-0 sm:self-auto">
                  Bill Details
                </Text>
              </div>
              <div className="container-xs mb-4 px-[411px] md:p-5 md:px-5 mt-[-20px]">
              <div className="flex flex-col items-center gap-3">
                <Heading size="xl" as="h1" className="mr-[46px] tracking-[7.00px] md:mr-0 !text-white">
                    ₱ <TotalAmount total={totalAmount} />
                </Heading>
                <Text size="xl" as="p" className="!font-montserrat tracking-[3.50px] !text-gray-300">
                    Due Date 15 May 2024
                </Text>
                </div>
              </div>
            </div>
          </div>
                <Suspense fallback={<div>Loading feed...</div>}>
            {bill.map((bill, index) => (
            <BillDetail
            key={"bill" + index}
            description={bill.description}
            amount={bill.amount}
          />
         ))}
    </Suspense>
                
        </div>
    </div>
    </>
    );
};

