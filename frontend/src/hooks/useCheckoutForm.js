import { useState, useCallback } from "react";
import { validateField, validateCheckoutForm, hasErrors } from "../utils/validation";
import { CHECKOUT_INITIAL_FORM, PAYMENT_METHODS } from "../utils/constants";

/**
 * Custom hook for checkout form state management
 * @returns {Object} - Form state and handlers
 */
export const useCheckoutForm = () => {
  const [form, setForm] = useState(CHECKOUT_INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.COD);

  /**
   * Handle field change
   */
  const handleChange = useCallback((key) => (e) => {
    const value = e.target.value;
    
    setForm((prev) => ({ ...prev, [key]: value }));

    // Clear field error when user starts typing
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }, []);

  /**
   * Set a specific field value
   */
  const setFieldValue = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  /**
   * Validate single field
   */
  const validateSingleField = useCallback((key) => {
    const error = validateField(key, form[key]);
    if (error) {
      setErrors((prev) => ({ ...prev, [key]: error }));
      return false;
    }
    return true;
  }, [form]);

  /**
   * Validate entire form
   */
  const validate = useCallback(() => {
    const newErrors = validateCheckoutForm(form);
    setErrors(newErrors);
    return !hasErrors(newErrors);
  }, [form]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setForm(CHECKOUT_INITIAL_FORM);
    setErrors({});
    setPaymentMethod(PAYMENT_METHODS.COD);
  }, []);

  /**
   * Get input className based on error state
   */
  const getInputClass = useCallback((key, baseClass = "") => {
    const errorClass = errors[key] 
      ? "border-red-500 focus:outline-red-500 focus:ring-red-500" 
      : "border-gray-300 focus:border-[#b99c79] focus:ring-[#b99c79]";
    return `border rounded-xl px-3 py-2.5 text-sm w-full transition focus:ring-1 ${errorClass} ${baseClass}`;
  }, [errors]);

  return {
    form,
    errors,
    paymentMethod,
    setPaymentMethod,
    handleChange,
    setFieldValue,
    validate,
    validateSingleField,
    resetForm,
    getInputClass,
    hasErrors: hasErrors(errors),
  };
};

export default useCheckoutForm;