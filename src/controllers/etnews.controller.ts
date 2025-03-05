import { Request, Response } from "express";

import etnewsService from "../services/etnews.service";
export default {
  getETNewsbyIDController: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const news = await etnewsService.getETNewsbyID(id);

      if (!news) {
        res.status(404).json({ message: "News not found" });
        return;
      }

      if (!news.visible) {
        res.status(416).json({ message: " Requested range not satisfiable" });
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
  }
};
