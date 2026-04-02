import { CreditCard, Check } from "lucide-react";
import { PAYMENT_OPTIONS } from "../../utils/constants";

const PaymentMethodSelect = ({ selected, onChange }) => {
  return (
    <div className="border rounded-2xl p-5 bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#f7f3ee] flex items-center justify-center">
          <CreditCard size={16} className="text-[#b99c79]" />
        </div>
        <h2 className="text-lg font-extrabold text-gray-900">Payment Method</h2>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        {PAYMENT_OPTIONS.map((option) => (
          <PaymentOption
            key={option.id}
            option={option}
            isSelected={selected === option.id}
            onSelect={() => onChange(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

const PaymentOption = ({ option, isSelected, onSelect }) => {
  return (
    <label
      className={`
        flex items-center justify-between border-2 rounded-xl px-4 py-3.5 cursor-pointer transition-all
        ${
          isSelected
            ? "border-[#b99c79] bg-[#faf8f5]"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Custom Radio */}
        <div
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
            ${isSelected ? "border-[#b99c79] bg-[#b99c79]" : "border-gray-300"}
          `}
        >
          {isSelected && <Check size={12} className="text-white" />}
        </div>

        {/* Label */}
        <div>
          <p className="font-semibold text-gray-900">{option.name}</p>
          <p className="text-xs text-gray-500">{option.description}</p>
        </div>

        {/* Hidden input for form accessibility */}
        <input
          type="radio"
          name="paymentMethod"
          value={option.id}
          checked={isSelected}
          onChange={onSelect}
          className="sr-only"
        />
      </div>

      {/* Recommended Badge */}
      {option.recommended && (
        <span className="text-xs font-semibold text-[#b99c79] bg-[#f7f3ee] px-2 py-1 rounded-full">
          Recommended
        </span>
      )}
    </label>
  );
};

export default PaymentMethodSelect;
