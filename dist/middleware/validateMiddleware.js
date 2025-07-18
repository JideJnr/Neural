import { body, validationResult } from 'express-validator';
export const validateSignup = [
    body('email')
        .isEmail()
        .withMessage('Valid email required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('firstName')
        .notEmpty()
        .withMessage('First name is required'),
    // final middleware to check results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
