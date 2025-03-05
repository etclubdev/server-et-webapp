import { Request, Response } from "express";

import etnewsService from "../services/etnews.service";

export default {
  createETNews: async (req: Request, res: Response) => {
    const news = req.body;
    try {
      const createdNews = await etnewsService.createNews(news);

      res.status(201).json({
        message: "Successfully",
        data: createdNews,
      })
      return;
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error " + error.message });
      return;
    }
  }
};

