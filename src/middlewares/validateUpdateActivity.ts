import { Request, Response, NextFunction } from "express";
import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import updateActivitySchema from "../schema/activity.schema";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(updateActivitySchema);

const formatAjvError = (errors: ErrorObject[] | null | undefined) => {
    if (!errors) return [];
    return errors.map((error) => {
        const property = error.instancePath ? error.instancePath.substring(1) : "root";
        return `Error in '${property}': ${error.message}`;
    });
};

const validateUpdateActivityMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const valid = validate(req.body);
    if (!valid) {
        const errors = formatAjvError(validate.errors);
        res.status(400).json({ message: "Validation failed", errors });
        return;
    }
    next();
};
export default validateUpdateActivityMiddleware; 