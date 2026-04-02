import { User } from "lucide-react";
import FormInput from "./FormInput";

const CustomerInfoForm = ({ form, errors, onChange }) => {
  return (
    <div className="border rounded-2xl p-5 bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#f7f3ee] flex items-center justify-center">
          <User size={16} className="text-[#b99c79]" />
        </div>
        <h2 className="text-lg font-extrabold text-gray-900">
          Customer Information
        </h2>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          value={form.fullName}
          onChange={onChange("fullName")}
          placeholder="Full name *"
          error={errors.fullName}
        />

        <FormInput
          type="email"
          value={form.email}
          onChange={onChange("email")}
          placeholder="Email (optional)"
          error={errors.email}
        />

        <div className="md:col-span-2">
          <FormInput
            type="tel"
            value={form.phone}
            onChange={onChange("phone")}
            placeholder="Phone *"
            error={errors.phone}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoForm;