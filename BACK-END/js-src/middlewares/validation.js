import {body, validationResult} from 'express-validator';


/**
 * custom validation functions for order inputs
 */

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

/**
 * validateOrderInputs is an array of validation rules for order inputs
 */
const validateOrderInputs = [
  body("customer_name").isString().isLength({ min: 3 }),
  body("order_type").isString().isIn(["delivery", "pickup"]),
  body("delivery_address").optional().isString().isLength({ min: 4 }),
  body("city").optional().isString().isLength({ min: 3 }),
  body("order_items").isArray().isLength({ min: 1 }),
  body("total_price").isNumeric().isLength({ min: 1 }),
];

/**
 * Order validation middleware for delivery orders
 */
const validateDeliveryOrder = [ 
  ...validateOrderInputs,
  (req, res, next) => {
    const { order_type, delivery_address, city } = req.body;

    // If delivery method is "Delivery", validate address and city
    if (order_type === "delivery") {
        if (!delivery_address || typeof delivery_address !== "string" || delivery_address.trim().length < 4) {
            return res.status(400).json({
                error: "Invalid address. Address must be at least 4 characters long.",
            });
        }

        if (!city || typeof city !== "string" || city.trim().length < 3) {
            return res.status(400).json({
                error: "Invalid city. City must be at least 3 characters long.",
            });
        }
    }

    // If "pick up" or validation passes
    next();
  },

  // express-validator error handling
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },
];

export { validateString, validatePositiveNumber, validateDeliveryOrder };