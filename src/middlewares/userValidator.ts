import { Response, Request, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const userValidator = [
    body('username').isString().notEmpty().isLength({ min: 3 }),
    body('password')
        .isString()
        .exists()
        .matches(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z.]{8,}$/),
];

export const setValidationResult = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.locals.cache = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};
