import { Request, Response } from "express";

import etnewsService from "../services/etnews.service";
export default {
  updateETNewsController: async (req: Request, res: Response) => {
    const { etnewsid } = req.params;
    const news = req.body;
    
    try {
        const updatedNews = await etnewsService.updateETNews(etnewsid, news);

        if (!updatedNews) {
            res.status(404).json({ message: "News not found" });
            return;
        }

      res.status(200).json({
        message: "Successfully",
        affected: updatedNews,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error " + error.message });
      return;
    }
  }
};
