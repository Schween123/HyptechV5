import { Helmet } from "react-helmet";
import { Img, Text, Button, Heading } from "../../../components";
import TotalAmount from "../../../components/TotalAmount/TotalAmount";
import { totalAmount } from "../../../components/TotalAmount/TotalAmount";
import { useNavigate } from 'react-router-dom';

const globalStyles = `
  body, html {
    background-color: #C5C3C6; 
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  #root, .app {
    height: 100%;
  }
`;

export default function BoarderProfilePage() {
  const navigate = useNavigate();

  const handleMyBillClick = () => {
    navigate('/billdetails');
  };

  const handleTransactionsClick = () => {
    navigate('/transactions');
  };

  const handlePayNowClick = () => {
    navigate('/paynow');
  };

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
        <style>{globalStyles}</style>
      </Helmet>
      <div className="w-full h-[100vh] max-h-[100vh] border border-solid border-white-A700 md:pb-5 overflow-hidden">
        <div className="flex flex-col items-center h-full">
          <div className="flex h-[50vh] items-start self-stretch bg-[url(/images/BoarderProfilebg.svg)] bg-cover bg-no-repeat p-[20px] md:h-auto">
            <div className="flex w-full flex-col items-start gap-[20px] md:w-full sm:gap-[10px]">
              <div className="flex flex-col items-start">
                <Heading as="h1" className="!font-semibold tracking-[3px] !text-white text-[24px] md:text-[20px]">
                  Boarder's Name
                </Heading>
                <Text size="lg" as="p" className="!font-montserrat tracking-[3px] !text-gray-300 text-[18px] md:text-[16px]">
                  Room 1
                </Text>
              </div>
              <div className="flex w-full flex-col items-center self-end">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Heading size="md" as="h2" className="!font-semibold tracking-[4px] !text-white">
                    ₱
                  </Heading>
                  <Heading size="lg" as="h3" className="!font-semibold tracking-[5px] !text-white">
                    <TotalAmount total={totalAmount} />
                  </Heading>
                </div>
                <Text size="md" as="p" className="!font-montserrat tracking-[2.5px] !text-gray-300">
                  Due
                </Text>
              </div>
            </div>
          </div>
          <div className="container relative mt-0 px-[20px] md:p-5 md:px-5 max-w-[600px] h-auto mx-auto" style={{ marginTop: '0px', paddingTop: '0px' }}>
            <div className="flex flex-col items-center gap-[15px] border-[3px] border-solid border-gray-400 bg-gray-300 p-[20px] shadow-lg sm:gap-[15px] sm:p-5" style={{ marginTop: '0px', paddingTop: '0px' }}>
              <div className="self-stretch pt-2">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-start justify-between gap-5 md:flex-col">
                    <div className="flex w-full flex-col gap-[20px] md:w-full">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Text as="p" className="!font-montserrat tracking-[2.5px] !text-customdarkgray2">
                            Next Bill
                          </Text>
                          <Text size="lg" as="p" className="!font-montserrat !font-medium tracking-[3px] !text-cyan-800 ml-2">
                            ₱ <TotalAmount total={totalAmount} />
                          </Text>
                        </div>
                        <Button onClick={handlePayNowClick}
                          size="md"
                          shape="round"
                          className="min-w-[100px] font-montserrat font-semibold text-[16px] sm:px-5 bg-customcyan !text-white"
                        >
                          Pay Now
                        </Button>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Text as="p" className="!font-montserrat tracking-[2.5px] !text-customdarkgray2">
                            Due Date
                          </Text>
                          <Text size="lg" as="p" className="!font-montserrat !font-medium tracking-[3px] ml-2 !text-customdarkgray2">
                            Next Bill
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[1px] bg-cyan-800" />
                  <div className="flex justify-center w-full">
                    <div className="flex justify-between items-center gap-[20px]">
                      <button onClick={handleMyBillClick} className="flex items-center gap-5 p-0 border-none bg-transparent cursor-pointer">
                        <Img src="/images/mybillbtn.png" alt="image" className="w-[40px]" />
                        <Text size="lg" as="p" className="mb-[10px] !font-montserrat !font-medium !text-customdarkgray2">
                          My Bill
                        </Text>
                        <Img src="/images/greaterthan_cyan.png" alt="arrowright" className="w-[20px] mb-[15px]" />
                      </button>
                      <button onClick={handleTransactionsClick} className="flex items-center gap-5 p-0 border-none bg-transparent cursor-pointer">
                        <Img src="/images/transactionsbtn.png" alt="image" className="w-[40px]" />
                        <Text size="lg" as="p" className="mb-[10px] !font-montserrat !font-medium !text-customdarkgray2">
                          Transactions
                        </Text>
                        <Img src="/images/greaterthan_cyan.png" alt="arrowright" className="w-[20px] mb-[15px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
