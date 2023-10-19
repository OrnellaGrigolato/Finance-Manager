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

const generateEmailContent = (username: string, email:string) => {
    const message = `
        Hello ${username},
        You just signed up to Finance Manager!

        We’re excited to have you on board and we’d love to say thank you on behalf of our team for choosing us to help you register your finances.
    `;

    return {
        from: email_finance,
        to: email,
        subject: `Welcome to Finance Manager, ${username}`,
        text: message,
    };
};

export const sendEmail = async (username: string, email:string) => {
    try {
        await transporter.sendMail(generateEmailContent(username, email));
        return true;
    } catch (error) {
        throw error;
    }
}
