import { Request, Response, NextFunction } from "express";
import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import activitySchema from "../schema/activity.schema";

//Cho phép AJV hiển thị tất cả lỗi cùng một lúc, thay vì chỉ dừng lại ở lỗi đầu tiên.
const ajv = new Ajv({ allErrors: true });

//kích hoạt kiểm tra định dạng chuẩn như uri, date, email 
addFormats(ajv);

const validate = ajv.compile(activitySchema);

const formatAjvError = (errors: ErrorObject[] | null | undefined) => {
    if (!errors) return [];
    return errors.map((error) => {
        const property = error.instancePath ? error.instancePath.substring(1) : "root";
        return `Error in '${property}' : ${error.message}`;
    });
};

const validateActivityMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const valid = validate(req.body);
    if (!valid) {
        const errors = formatAjvError(validate.errors);
        res.status(400).json({ message: "Validation failed", errors });
        return;
    }
    next();

};

export default validateActivityMiddleware; 