

import DiscountSection from "./DiscountSection";
import NoteSection from "./NoteSection";
import CustomerSection from "./CustomerSection";
import PaymentSection from "./PaymentSection";

const CustomerPaymentSection = ({ setShowCustomerDialog, setShowPaymentDialog }) => {

  return (
    <div className="w-2/5 flex flex-col bg-gray-900/80 border-l border-white/10 backdrop-blur-lg text-white overflow-y-auto">
      {/* Customer Section */}
      <CustomerSection setShowCustomerDialog={setShowCustomerDialog} />

      {/* Discount Section */}
      <DiscountSection />

      {/* Note Section */}
      <NoteSection />

      {/* Payment Section */}
     <PaymentSection setShowPaymentDialog={setShowPaymentDialog}/>
    </div>
  );
};

export default CustomerPaymentSection;
