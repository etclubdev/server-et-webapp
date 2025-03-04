import { Request, Response } from "express";

import etnewsService from "../services/etnews.service";
export default {
  getAllETNews: async (req: Request, res: Response) => {
    try {
      const news = await etnewsService.getAllNews();

      if (!news) {
        res.status(404).json({ message: "News not found!" });
        return;
      }

      res.status(200).json(news);
      return;

    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" + error.message });
      return;
    }
  }
};


