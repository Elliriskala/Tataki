const validateString = (value, fieldName) => {
  if (!value || typeof value !== "string") {
    throw new Error(`Missing or invalid ${fieldName}`);
  }
};

const validatePositiveNumber = (value, fieldName) => {
  if (typeof value !== "number" || value <= 0) {
    throw new Error(`Missing or invalid ${fieldName}`);
  }
};

export { validateString, validatePositiveNumber };