import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "huyhaibabon861@gmail.com", // Email của bạn
        pass: "jhdj kreo xnmh bpbt"  // Mật khẩu ứng dụng Gmail (App Password)
    }
});

export default async function sendEmail(to: string, subject: string, htmlContent: string) {
    await transporter.sendMail({
        from: "huyhaibabon861@gmail.com",
        to,
        subject,
        html: htmlContent, 
    });
}
