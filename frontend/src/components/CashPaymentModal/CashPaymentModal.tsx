import { FC, useEffect, useState } from "react";
import { Text, Img } from "../../components";

interface CashPaymentModalProps {
  onClose: () => void;
}

const CashPaymentModal: FC<CashPaymentModalProps> = ({ onClose }) => {
  const [billAmount, setBillAmount] = useState(0); // State to store the bill amount
  const [isReading, setIsReading] = useState(false); // State to track if reading is enabled

  const startReading = () => {
    setIsReading(true);
  };

  const stopReading = () => {
    setIsReading(false);
  };

  useEffect(() => {
    startReading(); // Start reading when the modal opens

    return () => {
      stopReading(); // Stop reading when the modal closes
    };
  }, []);

  useEffect(() => {
    if (isReading) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch('http://localhost:8000/api/bill-acceptor/');  // Adjust the URL if necessary
          const data = await response.json();
          if (data.bill_value && data.bill_value > 0) {
            setBillAmount(prevAmount => prevAmount + data.bill_value);
          }
        } catch (error) {
          console.error("Error fetching bill amount:", error);
        }
      }, 1000); // Fetch every 1 second

      return () => clearInterval(interval); // Clean up the interval on component unmount or when reading stops
    }
  }, [isReading]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-[400px] h-[300px] border-3 border-customcyan">
        <button onClick={onClose} className="absolute top-2 right-2">
          <Img src="public/images/exit.png" alt="Close" className="w-[15px] h-[15px]" />
        </button>
        <Text size="md" as="p" className="mb-4 text-center font-montserrat">
          Please Insert a Peso Bill in the Bill Acceptor
        </Text>
        <Text size="3xl" as="p" className="text-center mb-4 mt-10 text-customcyan font-montserrat">
          ₱ {billAmount.toFixed(2)} {/* Display the detected bill amount */}
        </Text>
        <Text size="xs" as="p" className="text-center mt-12 text-customgray4 font-open-sans">
          Note: Please do not insert crumpled and torn money
        </Text>
      </div>
    </div>
  );
};

export default CashPaymentModal;
