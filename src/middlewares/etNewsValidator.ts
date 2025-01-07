import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Định nghĩa schema Joi
const etNewsSchema = Joi.object({
    title: Joi.string().max(50).required().messages({
        'string.empty': 'Title is required.',
        'string.max': 'Title must not exceed 50 characters.',
    }),
    category: Joi.string()
        .valid(
            'Tin chính phủ số',
            'Tin công nghệ thế giới',
            'Tin công nghệ Việt Nam',
            'Tin tạo sự ảnh hưởng'
        )
        .required()
        .messages({
            'any.only': 'Category must be one of Tin chính phủ số, Tin công nghệ thế giới, Tin công nghệ Việt Nam, Tin tạo sự ảnh hưởng.',
            'string.empty': 'Category is required.',
        }),
    shortdescription: Joi.string().max(100).required().messages({
        'string.empty': 'ShortDescription is required.',
        'string.max': 'ShortDescription must not exceed 100 characters.',
    }),
    content: Joi.string().required().messages({
        'string.empty': 'Content is required.',
    }),
    source: Joi.string().uri().required().messages({
        'string.empty': 'Source is required.',
        'string.uri': 'Source must be a valid URL.',
    }),
    visible: Joi.string().required().messages({
        'any.required': 'Visible is required and must be a string.',
    }),
    thumbnailimageurl: Joi.string().uri().optional().messages({
        'string.uri': 'ThumbnailImageURL must be a valid URL.',
    }),
    viewcount: Joi.number().integer().min(0).optional().messages({
        'number.min': 'ViewCount must be greater than or equal to 0.',
    }),
    createddate: Joi.date().iso().required().messages({
        'date.format': 'CreatedDate must be in ISO 8601 format.',
    }),
    updateddate: Joi.date().iso().optional().messages({
        'date.format': 'UpdatedDate must be in ISO 8601 format.',
    }),
});

// Middleware validate dữ liệu
export const validateETNews = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = etNewsSchema.validate(req.body, { abortEarly: false });
    if (error) {
        // Gửi lỗi và kết thúc
        res.status(400).json({
            status: 400,
            message: 'Validation Error',
            errors: error.details.map((detail) => detail.message),
        });
        return; // Đảm bảo kết thúc middleware
    }
    next(); // Chuyển tiếp xử lý nếu không có lỗi
};
