import { Request, Response } from "express";
import apicache from "apicache";

import etNewsService from "../services/etNews.service";

export default {
  deleteETNews: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedNews = await etNewsService.deleteETNews(id);

      if (!deletedNews) {
        res.status(404).json({ message: "News not found!" });
        return;
      }
      apicache.clear('/et-news');
      res.status(204).json();
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error " + error.message });
      return;
    }
  },

  deleteMultipleEtNews: async (req: Request, res: Response) => {
    const { etNews } = req.body;
    try {
      const deletedNews = await etNewsService.deleteMultipleEtNews(etNews);

      if (!deletedNews) {
        res.status(404).json({ message: "Not found!" });
        return;
      }
      apicache.clear('/et-news');
      res.status(204).json()
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error " + error.message });
      return;
    }
  },

  updateETNews: async (req: Request, res: Response) => {
    const { id } = req.params;
    const news = req.body;

    try {
      const updatedNews = await etNewsService.updateETNews(id, news);

      if (!updatedNews) {
        res.status(404).json({ message: "News not found" });
        return;
      }
      apicache.clear('/et-news');
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
  },

  createETNews: async (req: Request, res: Response) => {
    const news = req.body;
    try {
      const createdNews = await etNewsService.createNews(news);
      apicache.clear('/et-news');
      res.status(201).json({
        message: "Successfully",
        data: createdNews,
      })
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" + error.message });
      return;
    }
  },

  getETNewsbyID: async (req: Request, res: Response): Promise<void> => {
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
