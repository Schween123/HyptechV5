import { Helmet } from "react-helmet";
import { useState } from "react";
import { Text, Input } from "../../../components";
import AddOnBill from "../../../components/AddOnBill/AddOnBill";
import "./style.css";
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

interface AddOn {
  description: string;
  amount: string; // Keep amount as string
}

export default function BillRegistration() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/boarderregistrationsuccessful'); // Adjust the path if needed
  };
  const [addOnBills, setAddOnBills] = useState<AddOn[]>([]);
  const [monthlyRent, setMonthlyRent] = useState<number>(0);

  const handleAddAddOn = () => {
    setAddOnBills([...addOnBills, { description: "", amount: "" }]);
  };

  const handleAddOnDescriptionChange = (index: number, description: string) => {
    const updatedAddOns = [...addOnBills];
    updatedAddOns[index].description = description;
    setAddOnBills(updatedAddOns);
  };

  const handleAddOnAmountChange = (index: number, amount: string) => {
    const updatedAddOns = [...addOnBills];
    updatedAddOns[index].amount = amount;
    setAddOnBills(updatedAddOns);
  };

  const calculateTotalMonthlyDue = () => {
    const addOnsTotal = addOnBills.reduce((total, addOn) => {
      const amount = parseFloat(addOn.amount);
      return isNaN(amount) ? total : total + amount;
    }, 0);
    return monthlyRent + addOnsTotal;
  };

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
        <style>{globalStyles}</style>
      </Helmet>
  
      <div className="flex w-full flex-col justify-center border border-solid border-white-A700 py-14 md:py-5">
        <div className="container-xs mb-[21px] flex justify-center md:p-5 ">
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-col items-start gap-[9px] self-stretch mb-10">
              <Text size="2xl" as="p" className="!font-montserrat tracking-[8.00px] !text-black-900">
                You're getting there
              </Text>
              <div className="h-px self-stretch bg-cyan-800" />
            </div>
            <div className="flex w-[85%] md:w-full md:flex-row sm:flex-col">
              <div className="flex flex-1 flex-col items-start">
                <div className="flex justify-between w-full">
                  <Text as="p" className="!font-opensans tracking-[3.00px] whitespace-nowrap">
                    Room Number:
                  </Text>
                  <Input
                    shape="square"
                    name="AssignedRoom"
                    placeholder="Room"
                    className="relative w-[110px] border-b-2 border-customColor1 ml-1 pb-[-30px] pt-[30px] mt-[-28px] !text-2xl"
                  />
                </div>
                <div className="flex justify-between w-full mt-2">
                  <Text as="p" className="!font-opensans tracking-[3.00px] whitespace-nowrap">
                    Monthly Rent:
                  </Text>
                  <div className="mt-[-33px] flex items-center">
                    <Text as="span" className="!font-opensans tracking-[3.00px] mb-[-35px]">
                      ₱
                    </Text>
                    <Input
                      shape="square"
                      name="MonthlyRent"
                      placeholder="000.00"
                      type="number"
                      onChange={(e) => setMonthlyRent(parseFloat(e.target.value))}
                      className="relative w-[110px] border-b-2 border-customColor1 ml-1 pb-[-30px] pt-[30px] !text-2xl"
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <Text as="p" className="!font-opensans tracking-[3.00px] whitespace-nowrap">
                    Add-ons:
                    <button 
                      onClick={handleAddAddOn}
                      className="-mt-2 ml-2 rounded-[8px] bg-blue-500 text-white w-6 h-6 items-center justify-center !text-base "
                    >
                      +
                    </button>
                  </Text>
                </div>
                <div className="flex flex-col w-full mt-2">
                  {addOnBills.map((addOn, index) => (
                    <AddOnBill
                      key={index}
                      index={index}
                      description={addOn.description}
                      amount={addOn.amount}
                      onDescriptionChange={handleAddOnDescriptionChange}
                      onAmountChange={handleAddOnAmountChange}
                    />
                  ))}
                </div>
                <div className="flex justify-between w-full mt-2">
                  <Text as="p" className="!font-opensans tracking-[3.00px] whitespace-nowrap">
                    Total Monthly Due:
                  </Text>
                  <Text as="p" className="!font-opensans tracking-[3.00px]">
                    ₱ {calculateTotalMonthlyDue().toFixed(2)}
                  </Text>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <Text as="p" className="!font-opensans tracking-[3.00px] whitespace-nowrap">
                    Advance:
                  </Text>
                  <div className="mt-[-32px] flex items-center">
                    <Text as="span" className="!font-opensans tracking-[3.00px] mb-[-35px]">
                      ₱
                    </Text>
                    <Input
                      shape="square"
                      name="AdvancePayment"
                      placeholder="000.00"
                      className="relative w-[110px] border-b-2 border-customColor1 ml-1 pb-[-30px] pt-[30px] !text-2xl"
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <Text as="p" className="!font-opensans tracking-[3.00px] whitespace-nowrap">
                    Initial Payment:
                  </Text>
                  <Text as="p" className="!font-opensans tracking-[3.00px]">
                    ₱ 000.00
                  </Text>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <Text as="p" className="!font-opensans tracking-[3.00px] whitespace-nowrap">
                    Due Date:
                  </Text>
                  <Text as="p" className="!font-opensans tracking-[3.00px]">
                    5 Feb 2024
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-end p-[50px]">
                <button onClick={handleButtonClick} className="bg-transparent border-none cursor-pointer">
                        <img src="/images/nxtbtn2.png" alt="arrowleft" />
                      </button>
                </div>
      </div>
    </>
  );
}
