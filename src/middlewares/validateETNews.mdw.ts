import { Request, Response, NextFunction } from 'express';
import Ajv, { Schema } from 'ajv';
import addFormats from 'ajv-formats';

export default function validate(etNews: Schema) {
    return function (req: Request, res: Response, next: NextFunction): Promise<void>{
        const ajv = new Ajv({ allErrors: true });
        addFormats(ajv);
        const valid = ajv.validate(etNews, req.body);
        if (!valid) {
            console.log(ajv.errors);
            res.status(400).json(ajv.errors);
            return;
        }
        next();
    };

}