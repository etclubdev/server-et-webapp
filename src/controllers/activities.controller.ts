// src/controllers/activityController.ts
import { Request, Response} from 'express';

import createActivityService from '../services/activities.service';

const createactivity = new createActivityService();

const createActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ActivityName, ActivityType, Description, Status, ThumbnailImageURL, StartDate, EndDate, Visible, SponsoredBudget, ActualExpenses, Scale } = req.body;

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