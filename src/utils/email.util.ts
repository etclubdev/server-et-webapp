import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Email của bạn
        pass: process.env.EMAIL_PASSWORD  // Mật khẩu ứng dụng Gmail (App Password)
    }
});

export default async function sendEmail(to: string, subject: string, htmlContent: string) {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html: htmlContent, 
    });
}
