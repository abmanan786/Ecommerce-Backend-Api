/**
 * Reusable form input component
 */
const FormInput = ({
  value,
  onChange,
  placeholder,
  error,
  className = "",
  type = "text",
  ...props
}) => {
  const baseClass = `
    border rounded-xl px-3 py-2.5 text-sm w-full transition 
    focus:ring-1 focus:outline-none
    ${error 
      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
      : "border-gray-300 focus:border-[#b99c79] focus:ring-[#b99c79]"
    }
  `;

  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseClass} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

/**
 * Reusable textarea component
 */
export const FormTextarea = ({
  value,
  onChange,
  placeholder,
  error,
  className = "",
  rows = 3,
  ...props
}) => {
  const baseClass = `
    border rounded-xl px-3 py-2.5 text-sm w-full transition resize-none
    focus:ring-1 focus:outline-none
    ${error 
      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
      : "border-gray-300 focus:border-[#b99c79] focus:ring-[#b99c79]"
    }
  `;

  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`${baseClass} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput;