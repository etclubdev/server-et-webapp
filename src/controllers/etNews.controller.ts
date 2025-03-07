import { Request, Response } from "express";

import etNewsService from "../services/etNews.service";
export default {
  getETNewsbyIDController: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const news = await etNewsService.getETNewsbyID(id);

      if (!news) {
        res.status(404).json({ message: "News not found" });
        return;
      }

      res.status(200).json({
        message: "Successfully",
        data: news,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error " + error.message });
      return;
    }
  },
  getAllETNews: async (req: Request, res: Response) => {
    try {
      const news = await etNewsService.getAllNews();

      if (!news) {
        res.status(404).json({ message: "News not found!" });
      }
      res.status(200).json({
        message: "Successfully",
        data: news,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" + error.message });
      return;
    }
  }
};