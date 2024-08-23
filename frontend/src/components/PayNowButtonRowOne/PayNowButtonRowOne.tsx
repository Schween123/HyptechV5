import { Text } from "./..";
import { totalAmount } from "../../components/TotalAmount/TotalAmount";
import TotalAmount from "../../components/TotalAmount/TotalAmount";

interface Props {
    className?: string;
    month?: string;
    duedate?: string;
    price?: string; 
}

export default function PayNowButtonRowOne({
  month = "Feb",
  duedate = "Due Date 15 Mar 2024",
  price = "P 000.00",
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-center p-[9px] md:p-5 border-b-gray-400 border border-solid bg-customgray flex-1 shadow-lg`}
    >
      
      <div className="flex w-[96%] items-center justify-between gap-5 md:w-full sm:flex-col">
    {/* Left Section */}
    <div className="flex w-[22%] justify-center sm:w-full">
        <div className="flex w-full items-center gap-[25px]">
           {/* Checkbox */}
           <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="custom-checkbox"
              />
            </label>

            {/* Text and Price Section */}
            <div className="flex flex-1 flex-col items-start">
                <Text as="p" className="tracking-[3.00px] !text-black-900 font-open-sans">
                    Jan
                </Text>
                <Text as="p" className="ml-auto mb-0 mt-[-20px] self-end tracking-[3.00px] !text-black-900 sm:self-auto font-open-sans">
                    ₱ <TotalAmount total={totalAmount} />
                </Text>
                <Text size="s" as="p" className="relative mt-[-20px] tracking-[2.00px] !text-customgray2 font-open-sans">
                    Due Date 15 Feb 2024
                </Text>
            </div>
        </div>
    </div>

</div>
</div>



                
  );
}
