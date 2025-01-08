import Ajv, { Schema } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const activitySchema: Schema = {
  type: "object",
  properties: {
    ActivityName: { type: "string", maxLength: 300 },
    ActivityType: {
      type: "string",
      enum: [
        "Talkshow/Workshop",
        "Cuộc thi",
        "Game",
        "Hoạt động truyền thông",
        "Hoạt động nội bộ",
      ],
    },
    Description: {
      type: "string",
    },
    Status: {
      type: "string",
      enum: ["Đã diễn ra", "Đang diễn ra", "Nội bộ", "Sắp diễn ra"],
    },
    ThumbnailImageURL: {
      type: "string",
      format: "uri",
    },
    StartDate: { type: "string" },
    EndDate: { type: "string" },
    Visible: { type: "boolean" },
    SponsoredBudget: { type: "number"},
    ActualExpenses: { type: "number" },
    Scale: { type: "number"}
  },
  required: [
    "ActivityName",
    "ActivityType",
    "Status",
    "ThumbnailImageURL",
    "StartDate",
    "EndDate",
    "Visible",
  ],
  additionalProperties: false,
};

export default activitySchema;
