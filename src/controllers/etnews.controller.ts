import { Request, Response } from "express";

import etnewsService from "../services/etnews.service";
export default {
  updateETNewsController: async (req: Request, res: Response) => {
    const { id } = req.params;
    const news = req.body;
    
    try {
        const updatedNews = await etnewsService.updateETNews(id, news);

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
      console.log(error);
      res.status(500).json({ message: "Internal Server Error " + error.message });
      return;
    }
  }
};
