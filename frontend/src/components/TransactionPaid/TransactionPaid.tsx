import { Text } from "../../components";

interface TransactionPaidProps {
    month: string;
    date: string;
    dues: number;
  }
  
  const TransactionPaid: React.FC<TransactionPaidProps> = ({ month, date, dues }) => {
    return (
        <>
        <div className="flex flex-1 rounded-[20px] bg-customdarkgray4 p-3.5 shadow-lg">
        <div className="flex w-full items-start justify-between gap-5">
        <div className="flex flex-col items-start">
            <Text as="p" className="tracking-[3.00px] !text-black-900">
            {month}
            </Text>
        <div className="flex rounded-[5px] border border-solid border-cyan-800 bg-blue_gray-100 px-[3px]">
            <Text size="xs" as="p" className="tracking-[1.5 px] !text-cyan-900">
            Paid
            </Text>
        </div>
            <Text size="s" as="p" className="mt-1.5 tracking-[2.00px]">
                {date}
                </Text>
            </div>
            <Text as="p" className="mt-6 tracking-[3.00px] !text-black-900">
            ₱ {dues}
                </Text>
            </div>
        </div>
    </>
    );
}

export default TransactionPaid;