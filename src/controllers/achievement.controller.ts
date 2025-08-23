import { Request, Response } from "express";

import achievementService from "../services/achievement.service";

export default
    {
        updateAchievement: async (req: Request, res: Response): Promise<void> => {
            const { id } = req.params;
            const achievementData = req.body;

            try {
                const updatedAchievement = await achievementService.updateAchievement(id, achievementData);

                if (!updatedAchievement) {
                    res.status(404).json({
                        message: "Achievement not found or no changes applied"
                    });
                    return;
                }

                res.status(200).json({
                    message: "The achivement is updated successfully",
                    affected: updatedAchievement
                });
                return;

            } catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Internal Server Error"
                });
                return;
            }
        },
        deleteAchievement: async (req: Request, res: Response): Promise<void> => {
            const { id } = req.params;

            try {
                const deletedAchievement = await achievementService.deleteAchievementById(id);

                if (deletedAchievement === 0) {
                    res.status(404).json({
                        message: "The activity post is not found"
                    });
                    return;
                }

                res.status(204);
                return;
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Internal Server Error"
                });
                return;
            }
        },
        deleteAchievements: async (req: Request, res: Response) => {
            const { achievements } = req.body;

            try {
                const deletedAchievement = await achievementService.deleteAchievements(achievements)

                if (!deletedAchievement) {
                    res.status(404).json({
                        message: 'Not found'
                    })
                    return;
                }

                res.sendStatus(204)
                return;
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: 'Internal Server Error ' + error.message
                })
            }
        },
        getAchievementById: async (req: Request, res: Response) => {
            try {
                const { id } = req.params;

                const achievement = await achievementService.getAchievementById(id);

                if (!achievement) {
                    res.status(404).json({
                        message: "The achievement does not exist",
                        data: null
                    });
                    return;
                }

                res.status(200).json({
                    message: "Successfully retrieved achievement",
                    data: achievement
                });
                return;

            } catch (error) {
                console.error("Error retrieving achievement:", error);
                res.status(500).json({
                    message: "Internal Server Error: " + error.message
                });
                return;
            }
        },

        createAchievement: async (req: Request, res: Response): Promise<void> => {
            const achievement = req.body;
            try {
                const createdAchievement = await achievementService.createAchievement(achievement);
                res.status(200).json({
                    message: "The achievement is created successfully",
                    data: createdAchievement
                });
                return;
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "Internal Server Error"
                });
                return;
            }
        },

        getAllAchievements: async (req: Request, res: Response) => {
            try {
                const achievements = await achievementService.getAllAchievements();

                if (!achievements || achievements.length === 0) {
                    res.status(404).json({
                        message: "No achievements found!",
                        data: []
                    });
                    return;
                }

                res.status(200).json({
                    message: "Successfully retrieved achievements",
                    data: achievements
                });
                return;

            } catch (error) {
                console.error("Error retrieving achievements:", error);
                res.status(500).json({
                    message: "Internal Server Error: " + (error as Error).message
                });
                return;
            }
        }
    };
