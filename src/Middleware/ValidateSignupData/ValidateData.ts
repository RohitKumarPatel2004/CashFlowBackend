import { Request, Response, NextFunction } from 'express';
import { AnySchema ,ValidationError } from 'yup';

export const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        }, {
            abortEarly: false,  
            stripUnknown: true  
        });
        next();
    } catch (error) {
        if (error instanceof ValidationError) {
            const errors = error.inner.map(err => err.message);
            res.status(400).json({msg: errors });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
