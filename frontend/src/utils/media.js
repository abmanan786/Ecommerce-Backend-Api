export const BACKEND_ORIGIN =
  "https://ecommerce-backend-api-production-9628.up.railway.app";

export const FALLBACK_IMG =
  "https://placehold.co/900x900/f3f4f6/9ca3af?text=Product";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return FALLBACK_IMG;
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return `${BACKEND_ORIGIN}${imagePath}`;
  return `${BACKEND_ORIGIN}/images/${imagePath}`;
};
