import Ajv, { Schema } from "ajv";
import addFormats from "ajv-formats";

// Nếu có nhiều lỗi, AJV sẽ trả về tất cả lỗi, không chỉ lỗi đầu tiên.
const ajv = new Ajv({ allErrors: true });

//kích hoạt kiểm tra định dạng chuẩn như uri, date, email
addFormats(ajv);

const activitySchema: Schema = {
    type: "object",
    properties: {
        title: { type: "string", maxLength: 60 },
        category: { type: "string", enum: ["Workshop", "Guide", "Startup", "Tech News", "Others"] },
        metaDescription: { type: "string", maxLength: 160 },
        thumbnailImage: { type: "string", format: "uri" },
        startDate: { type: "string", format: "date" },
        endDate: { type: "string", format: "date" },
        visible: { type: "boolean" },
        content: { type: "string" }

    },
    required: ["title", "category", "startDate", "endDate", "visible", "content"],
    additionalProperties: false,
};

export default activitySchema;