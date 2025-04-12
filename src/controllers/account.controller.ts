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
}