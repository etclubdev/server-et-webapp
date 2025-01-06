// src/controllers/activityController.ts
import { Request, Response} from 'express';
import createActivityService from '../services/createActivity.service';

const createactivity = new createActivityService();

const createActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ActivityName, ActivityType, Description, Status, ThumbnailImageURL, StartDate, EndDate, Visible, SponsoredBudget, ActualExpenses, Scale } = req.body;


    if (!ActivityName) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    if (ActivityName.length > 300) {
      res.status(400).json({ message: "ActivityName must be less than 300 characters." });
      return;
    }

    if (!ActivityType) {
      res.status(400).json({ message: "ActivityType is required." });
      return;
    }

    const validActivityTypes = ["Talkshow/Workshop", "Cuộc thi", "Game", "Hoạt động truyền thông", "Hoạt động nội bộ"];
    if (!validActivityTypes.includes(ActivityType)) {
      res.status(400).json({ message: `ActivityType must be one of ${validActivityTypes.join(", ")}` });
      return;
    }

    if (!Status) {
      res.status(400).json({ message: "Status is required." });
      return;
    }

    const validStatuses = ["Đã diễn ra", "Đang diễn ra", "Nội bộ", "Sắp diễn ra"];
    if (!validStatuses.includes(Status)) {
      res.status(400).json({ message: `Status must be one of ${validStatuses.join(", ")}` });
      return;
    }

    if (!StartDate) {
      res.status(400).json({ message: "StartDate is required." });
      return;
    }

    if (!EndDate) {
      res.status(400).json({ message: "EndDate is required." });
      return;
    }

    if (new Date(StartDate) >= new Date(EndDate)) {
      res.status(400).json({ message: "EndDate must be later than StartDate." });
      return;
    }

    if (!Visible) {
      res.status(400).json({ message: "Visible is required." });
      return;
    }
    if (typeof Visible !== "boolean") {
      res.status(400).json({ message: "Visible must be a boolean." });
      return;
    }

    // Gọi service để tạo mới Activity
    const newActivity = await createactivity.createActivity({
      ActivityName,
      ActivityType,
      Description,
      Status,
      ThumbnailImageURL,
      StartDate: new Date(StartDate),
      EndDate: new Date(EndDate),
      Visible,
      SponsoredBudget,
      ActualExpenses,
      Scale
    });

    // Trả về Activity mới tạo
    res.status(200).json({
        message: "Successfully",
        data: newActivity,
    });
  } catch (error) {
    res.status(500).json ({
      message: 'An internal server error occurred',
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export default createActivity;