import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import accountService from '../services/account.service';
import sendEmail from '../utils/email.util';

export default {
    createAccount: async (req: Request, res: Response): Promise<void> => {
        try {
            const logInUrl = process.env.logInUrl;
            const manageProfileUrl = process.env.manageProfileUrl;

            const password = uuidv4().slice(0, 12);

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const account = {
                ...req.body,
                password: hashedPassword,
            };

            const createdAccount = await accountService.createAccount(account);

            sendEmail(createdAccount.username, 'Password Reset Request - New Login Credentials',
                `<p>Dear ${createdAccount.personnel_name},</p>
                <p>We have successfully processed your password reset request for your ${createdAccount.sysrole_name} account. Here are your new login credentials:</p>
                <ul>
                    <li><strong>Username:</strong> ${createdAccount.username}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p>To ensure the security of your account, please follow these steps:</p>
                <ol>
                    <li><strong>Log in</strong> to your account at ${logInUrl}.</li>
                    <li><strong>Change your password</strong> immediately after logging in by navigating to ${manageProfileUrl}.</li>
                </ol>
                <p>If you did not request this password reset, please contact our support team immediately at tech.etclub@gmail.com.</p>
                <p>Best regards,<br>
                Technical Department | ET Club</p>`
            )


            res.status(201).json({
                msg: "The account has been created successfully.",
                data: {
                    account_id: createdAccount.account_id,
                    sysrole_id: createdAccount.sysrole_id,
                    username: createdAccount.username,
                    personnel_id: createdAccount.personnel_id,
                    created_on: createdAccount.created_on,
                    last_modified_on: createdAccount.last_modified_on,
                    personnel_name: createdAccount.personnel_name,
                    phone_number: createdAccount.phone_number,
                    email: createdAccount.email,
                    dob: createdAccount.dob,
                    gender: createdAccount.gender,
                    address: createdAccount.address,
                    student_id: createdAccount.student_id,
                    university: createdAccount.university,
                    faculty: createdAccount.faculty,
                    major: createdAccount.major,
                    class: createdAccount.class,
                    cv_type: createdAccount.cv_type,
                    cv_link: createdAccount.cv_link,
                    cohort_name: createdAccount.cohort_name,
                    sysrole_name: createdAccount.sysrole_name,
                },
            });            
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error" + error.message
            });
            return;
        }
    },
    getAccountById: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const account = await accountService.getAccountById(id);
            console.log(account);

            if (!account) {
                res.status(404).json({
                    msg: "Not found"
                })
                return;
            }

            res.status(200).json({
                msg: "Successfully",
                data: account
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error" + error.message
            })
            return;
        }
    },
    getAllAccount: async (req: Request, res: Response) => {
        try {
            const accounts = await accountService.getAllAccount();

            if (!accounts) {
                res.status(404).json({
                    msg: "No accounts found"
                })
                return;
            }

            res.status(200).json({
                msg: "Successfully",
                data: accounts
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error" + error.message
            })
            return;
        }
    },
    updateAccount: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { sysrole_id } = req.body;

        try {
            const updatedAccount = await accountService.updateAccount(id, sysrole_id);

            if (!updatedAccount) {
                res.status(404).json({
                    msg: "Account not found or no changes applied"
                })
                return;
            }

            res.status(200).json({
                msg: "Successfully",
                data: updatedAccount
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal Server Error' + err.message
            })
            return;
        }
    },
    deleteAccount: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedAccount = await accountService.deleteAccount(id);

            if (!deletedAccount) {
                res.status(404).json({
                    msg: "Not found"
                })
                return;
            }
            res.status(204).json({
                msg: "Successfully",
                data: deletedAccount
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal Server Error' + err.message
            })
            return;
        }
    },
    deleteAccounts: async (req: Request, res: Response) => {
        const { accounts } = req.body;

        try {
            const deletedAccounts = await accountService.deleteAccounts(accounts);

            if (!deletedAccounts) {
                res.status(404).json({
                    msg: "Not found"
                })
                return;
            }
            res.status(204).json({
                msg: "Successfully",
                data: deletedAccounts
            })
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal Server Error' + err.message
            })
            return;
        }
    },
    updatePassword: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;

            const result = await accountService.updatePassword(id, oldPassword, newPassword);

            if (!result) {
                res.status(404).json({ message: "Not found" });
                return
            }

            if (result.success === false) {
                res.status(401).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({ success: true, message: result.message });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" + error.message });
            return;
        }
    },
}