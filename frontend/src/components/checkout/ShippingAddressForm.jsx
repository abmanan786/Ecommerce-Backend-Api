import { Truck } from "lucide-react";
import FormInput, { FormTextarea } from "./FormInput";

const ShippingAddressForm = ({ form, errors, onChange }) => {
  return (
    <div className="border rounded-2xl p-5 bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#f7f3ee] flex items-center justify-center">
          <Truck size={16} className="text-[#b99c79]" />
        </div>
        <h2 className="text-lg font-extrabold text-gray-900">
          Shipping Address
        </h2>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <FormInput
            value={form.address1}
            onChange={onChange("address1")}
            placeholder="Address line *"
            error={errors.address1}
          />
        </div>

        <FormInput
          value={form.city}
          onChange={onChange("city")}
          placeholder="City *"
          error={errors.city}
        />

        <FormInput
          value={form.postalCode}
          onChange={onChange("postalCode")}
          placeholder="Postal code (optional)"
          error={errors.postalCode}
        />

        <div className="md:col-span-2">
          <FormTextarea
            value={form.notes}
            onChange={onChange("notes")}
            placeholder="Order notes (optional)"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;