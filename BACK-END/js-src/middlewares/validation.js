/**
 * 
 * @param {number} value 
 * @param {string} fieldName 
 */

const validateString = (value, fieldName) => {
  if (!value || typeof value !== "string") {
    throw new Error(`Missing or invalid ${fieldName}`);
  }
};

/**
 * 
 * @param {number} value 
 * @param {string} fieldName
 * @throws {Error} if value is not a number or less than or equal to 0 
 */
const validatePositiveNumber = (value, fieldName) => {
  if (typeof value !== "number" || value <= 0) {
    throw new Error(`Missing or invalid ${fieldName}`);
  }
};

export { validateString, validatePositiveNumber };