import { Request, Response } from "express";

import personnelService from "../services/personnel.service";

export default {
    getUnregisteredPersonnels: async (req: Request, res: Response): Promise<void> => {
        try {
            const personnels = await personnelService.getUnregisteredPersonnels();

            if (!personnels || personnels.length === 0) {
                res.status(404).json({
                    message: "No unregistered personnel found",
                    data: [],
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved unregistered personnels",
                data: personnels,
            });
        } catch (error) {
            console.error("Error retrieving personnels:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
    deleteMultiplePersonnels: async (req: Request, res: Response): Promise<void> => {
        const { personnelIds } = req.body;
        try {

            const affectedRows = await personnelService.deleteMultiplePersonnels(personnelIds);
            if (affectedRows === 0) {
                res.status(404).json({
                    message: "No personnel found to delete",
                });
                return;
            }

            res.status(204).json();
            return;
        } catch (error) {
            console.error("Error deleting multiple personnels:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
    deletePersonnel: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const isDeleted = await personnelService.deletePersonnel(id);

            if (!isDeleted) {
                res.status(404).json({
                    message: "Personnel not found",
                });
                return;
            }

            res.status(204).json();
            return;
        } catch (error) {
            console.error("Error deleting personnel:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
    updatePersonnel: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { personnel, status } = req.body;

        try {
            const { personnel: updatedPersonnel, status: updatedStatus } = await personnelService.updatePersonnel(
                id,
                personnel,
                status
            );


            if (!updatedPersonnel && !updatedStatus) {
                res.status(404).json({
                    message: "Personnel and status not found or no changes applied",
                    data: null,
                });
                return;
            }

            res.status(200).json({
                message: "Personnel updated successfully",
                data: {
                    personnel: updatedPersonnel ?? null,
                    status: updatedStatus ?? null,
                },
            });
            return;
        } catch (error) {
            console.error("Error updating personnel:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
    getPersonnelByID: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const personnel = await personnelService.getPersonnelByID(id);

            if (!personnel) {
                res.status(404).json({
                    message: "Personnel not found",
                    data: null
                });
                return;
            }

            res.status(200).json({
                message: "Successfully retrieved personnel",
                data: personnel
            });
            return;

        } catch (error) {
            console.error("Error retrieving personnel:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message
            });
            return;
        }
    },
    createPersonnelWithStatus: async (req: Request, res: Response): Promise<void> => {
        const { personnel, status } = req.body;

        try {
            const isUnique = await personnelService.checkUniqueEmail(personnel.email)
            if(!isUnique) {
                res.status(409).json({
                    message: "The email is not available"
                })
                return;
            } 
            const created = await personnelService.createPersonnelWithStatus(personnel, status);
            res.status(201).json({
                message: "Personnel and status created successfully",
                data: created
            });
            return;
        } catch (error) {
            console.error("Error creating personnel with status:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    getPersonnels: async (req: Request, res: Response): Promise<void> => {
        const { departmentName } = req.query;
        const status = req.query.status as string | string[] | undefined;

        try {
            let personnels;

            if (
                status && Array.isArray(status) &&
                departmentName && typeof departmentName === "string"
            ) {
                personnels = await personnelService.getPersonnelByDepartmentAndStatus(departmentName, status);
    
                if (!personnels || personnels.length === 0) {
                    res.status(404).json({
                        message: "No personnel found with the given department and status",
                        data: [],
                    });
                    return;
                }
            }
            else if (status && Array.isArray(status)) {
                personnels = await personnelService.getPersonnelByStatus(status);

                if (!personnels || personnels.length === 0) {
                    res.status(404).json({
                        message: "No personnel found with the given status",
                        data: [],
                    });
                    return;
                }
            } else if (departmentName && typeof departmentName === "string") {
                personnels = await personnelService.getPersonnelByDepartment(departmentName);
                
                if (!personnels || personnels.length === 0) {
                    res.status(404).json({
                        message: "No personnel found in the given department",
                        data: [],
                    });
                    return;
                }
            }
            else {
                personnels = await personnelService.getAllPersonnel();

                if (!personnels || personnels.length === 0) {
                    res.status(404).json({
                        message: "No personnel found",
                        data: [],
                    });
                    return;
                }
            }

            res.status(200).json({
                message: "Successfully retrieved personnels",
                data: personnels,
            });
            return;
        } catch (error) {
            console.error("Error retrieving personnels:", error);
            res.status(500).json({
                message: "Internal Server Error: " + error.message,
            });
            return;
        }
    },
};