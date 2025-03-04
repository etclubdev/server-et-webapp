import { Request, Response } from "express";

import etnewsService from "../services/etnews.service";

export default {
  deleteETNews: async (req: Request, res: Response) => {
    const { etnews_id } = req.params;
    try {
      const deletedNews = await etnewsService.deleteETNews(etnews_id);

      if (!deletedNews) {
        res.status(404).json({ message: "News not found!" });
        return;
      }

      res.status(200).json({
        message: "Successfully",
        data: deletedNews,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error " + error.message });
      return;
    }
  }
};
