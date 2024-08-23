import { Helmet } from "react-helmet";
import { Text } from "../../../components";
import { Suspense } from "react";
import TransactionPaid from "../../../components/TransactionPaid/TransactionPaid";
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

const transactions: { month: string; date: string; dues: number; }[] = [
    { month: "Jan", date: "5 Jan 2024", dues: 500 },
    { month: "Feb", date: "10 Feb 2024", dues: 1000 },
    { month: "Mar", date: "15 Mar 2024", dues: 1500 },
    { month: "Apr", date: "20 Apr 2024", dues: 2000 },
    { month: "May", date: "25 May 2024", dues: 2500 }
  ];

export default function TransactionsPage() {

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
    <div className="w-full border border-solid border-white-A700">
        <div className="flex flex-col items-center gap-5 pb-[54px] md: pb-5">
            <div className="self-stretch">
            <div className="flex items-center gap-[7px] self-stretch bg-customcyan p-3.5">
            <button onClick={handleButtonClick} className="p-5 cursor-pointer">
                <img src="/images/backbtn.png" alt="arrowleft" />
              </button>
                <Text size="3xl" as="p" className="tracking-[4.50px] !text-white pl-5">
                Transactions
                </Text>
            </div>
                </div>
            <div className="container-xs md:p-5">
        <div className="flex flex-col gap-[30px]">
            <Suspense fallback={<div>Loading feed...</div>}>
            {transactions.map((transaction, index) => (
            <TransactionPaid
            key={"transactions" + index}
            month={transaction.month}
            date={transaction.date}
            dues={transaction.dues}
          />
         ))}
    </Suspense>
    </div>
    </div>
    </div>
    </div>
    </>
    );
}
