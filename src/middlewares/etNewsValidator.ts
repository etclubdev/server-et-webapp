import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Định nghĩa schema Joi
const updateETNewsSchema = Joi.object({
    title: Joi.string().max(50).optional().messages({
        'string.max': 'Title must not exceed 50 characters.',
    }),
    category: Joi.string()
        .valid(
            'Tin chính phủ số',
            'Tin công nghệ thế giới',
            'Tin công nghệ Việt Nam',
            'Tin tạo sự ảnh hưởng'
        )
        .optional()
        .messages({
            'any.only': 'Category must be one of Tin chính phủ số, Tin công nghệ thế giới, Tin công nghệ Việt Nam, Tin tạo sự ảnh hưởng.',
        }),
    shortdescription: Joi.string().max(100).optional().messages({
        'string.max': 'ShortDescription must not exceed 100 characters.',
    }),
    content: Joi.string().optional().messages({
        'string.base': 'Content must be a string.',
    }),
    source: Joi.string().uri().optional().messages({
        'string.uri': 'Source must be a valid URI.',
    }),
    visible: Joi.string().valid('Yes', 'No').optional().messages({
        'any.only': 'Visible must be either "Yes" or "No".',
    }),

});

// Middleware validate dữ liệu
export const validateUpdateETNews = (req: Request, res: Response, next: NextFunction): void => {
    // Kiểm tra nếu payload rỗng
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
            status: 400,
            message: 'Payload is empty. Please provide fields to update.',
        });
        return;
    }

    // Validate payload
    const { error } = updateETNewsSchema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(400).json({
            status: 400,
            message: 'Validation Error',
            errors: error.details.map((detail) => detail.message),
        });
        return;
    }

    next();
};
