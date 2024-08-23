import { FC, useState } from "react";
import { Button, Text, Img } from "../../components";
import CashPaymentModal from "../CashPaymentModal/CashPaymentModal";

interface PaymentMethodModalProps {
  onClose: () => void;
  onSelect: (method: string) => void;
}

const PaymentMethodModal: FC<PaymentMethodModalProps> = ({ onClose, onSelect }) => {
  const [showCashModal, setShowCashModal] = useState(false);

  const handleCashSelect = () => {
    setShowCashModal(true);
  };

  const handleCashClose = () => {
    setShowCashModal(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[400px] h-[300px]">
          <button onClick={onClose} className="absolute top-2 right-2">
            <Img src="public/images/exit.png" alt="Close" className="w-[15px] h-[15px]" />
          </button>
          <Text size="lg" as="p" className="mb-4 text-center font-montserrat">
            Select Payment Method
          </Text>
          <div className="flex flex-col gap-2 items-center mt-[20px]">
            <div className="bg-customcyan text-white rounded-lg px-4 py-2 font-montserrat">
              <Button
                size="xs"
                shape="square"
                onClick={handleCashSelect}
              >
                CASH
              </Button>
            </div>
            <div className="bg-customcyan text-white rounded-lg px-4 py-2 font-montserrat">
              <Button
                size="xs"
                shape="square"
                onClick={() => {
                  onSelect("GCASH");
                  onClose();
                }}
              >
                GCASH
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showCashModal && (
        <CashPaymentModal 
          onClose={handleCashClose} 
        />
      )}
    </>
  );
};

export default PaymentMethodModal;
