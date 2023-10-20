import nodemailer from "nodemailer";

const email_finance = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email_finance,
        pass,
    },
});

const EmailContent = (username: string, email:string, token: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/api/users/verify?token=${token}`;

    const message = `
        Hello ${username},
        You just signed up to Finance Manager!

        Please click on the link below to verify your email (it will expire in 1hs):
        ${verificationUrl}
        Remember you can resend this link by going to: Profile -> Verify account

        We’re excited to have you on board and we’d love to say thank you on behalf of our team for choosing us to help you register your finances.
    `;

    return {
        from: email_finance,
        to: email,
        subject: `Welcome to Finance Manager, ${username}`,
        text: message,
    };
};


export const sendEmail = async (username: string, email:string, token:string) => {
    try {
        await transporter.sendMail(EmailContent(username, email, token));
        return true;
    } catch (error) {
        throw error;
    }
}
