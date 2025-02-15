import { Request, Response, NextFunction} from 'express';
import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';

import activitySchema from '../schema/activity.schema';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = ajv.compile(activitySchema);

const formatAjvError = (err: ErrorObject[] | null | undefined) => {
    if (!err) return [];
    return err.map((error) => {
        const property = error.instancePath ? error.instancePath.substring(1) : "root";
        switch (error.keyword) {
            case "required":
                return `Missing required field: '${error.params.missingProperty}'.`;
            case "type":
                return `The field '${property}' must be of type '${error.params.type}'.`;
            case "maxLength":
                return `The field '${property}' exceeds the maximum length of ${error.params.limit} characters.`;
            case "enum":
                return `The field '${property}' must be one of the following values: ${error.params.allowedValues.join(", ")}.`;
            case "format":
                return `The field '${property}' does not match the required format: '${error.params.format}'.`;
            case "additionalProperties":
                return `The field '${property}' has an additional property that is not allowed: '${error.params.additionalProperty}'.`;
            default:
                return `Error in the field '${property}': ${error.message}`;
        }
    })
};

const validateActivityMiddleware = (req: Request, res: Response, next: NextFunction) : void=> {
    const valid = validate(req.body);

    if(!valid) {
        const errors = formatAjvError(validate.errors);
        res.status(400).json({ 
            message: "Validation failed",
            errors
        });
        return;
    }
    next();
}

export default validateActivityMiddleware;