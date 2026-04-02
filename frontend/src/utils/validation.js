/**
 * Checkout form validation rules
 */

export const VALIDATION_RULES = {
  fullName: {
    required: true,
    message: "Full name is required",
  },
  email: {
    required: false,
    pattern: /^\S+@\S+\.\S+$/,
    message: "Enter a valid email",
  },
  phone: {
    required: true,
    message: "Phone is required",
    pattern: /^03\d{9}$/,
  },
  address1: {
    required: true,
    message: "Address is required",
  },
  city: {
    required: true,
    message: "City is required",
  },
  postalCode: {
    required: false,
  },
  notes: {
    required: false,
  },
};

/**
 * Validate a single field
 * @param {string} key - Field name
 * @param {string} value - Field value
 * @returns {string|null} - Error message or null
 */
export const validateField = (key, value) => {
  const rule = VALIDATION_RULES[key];
  if (!rule) return null;

  const trimmedValue = String(value || "").trim();

  // Required check
  if (rule.required && !trimmedValue) {
    return rule.message;
  }

  // Pattern check (only if value exists)
  if (rule.pattern && trimmedValue && !rule.pattern.test(trimmedValue)) {
    return rule.message;
  }

  return null;
};

/**
 * Validate entire form
 * @param {Object} form - Form data object
 * @returns {Object} - Errors object
 */
export const validateCheckoutForm = (form) => {
  const errors = {};

  Object.keys(VALIDATION_RULES).forEach((key) => {
    const error = validateField(key, form[key]);
    if (error) {
      errors[key] = error;
    }
  });

  return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object
 * @returns {boolean}
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
