import nodemailer from "nodemailer";

const email_finance = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email_finance,
    pass: pass,
  },
  secure: false,
  port: 465,
  logger: true,
  tls: { rejectUnauthorized: false },
});

const EmailContent_profile = (
  username: string,
  email: string,
  token: string
) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/api/users/verify?token=${token}`;

  const message = `
        Hello ${username}, we see you are trying to verify your account!

        Please click on the link below to verify your email (it will expire in 1hs):
        ${verificationUrl}

        We send our regards, Finance Manager.
        `;

  return {
    from: email_finance,
    to: email,
    subject: `Account verification, Finance Manager`,
    text: message,
  };
};

const EmailContent = (username: string, email: string, token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
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

const EmailContent_reset_password = (username: string, email: string, token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/reset-password/${token}`;

  const message = `
        Hello ${username}, Finance Manager speaking!

        Please click on the link below to reset your password and unlock your account (it will expire in 1hs):
        ${verificationUrl}
        Remember you can resend this link by going to: Login -> Forgot password

    `;

  return {
    from: email_finance,
    to: email,
    subject: `${username}, reset your password.`,
    text: message,
  };
};

export const sendEmail = async (
  username: string,
  email: string,
  token: string
) => {
  try {
    await transporter.sendMail(EmailContent(username, email, token));
    return true;
  } catch (error) {
    throw error;
  }
};

export const sendEmail_profile = async (
  username: string,
  email: string,
  token: string
) => {
  try {
    await transporter.sendMail(EmailContent_profile(username, email, token));
    return true;
  } catch (error) {
    throw error;
  }
};

export const sendEmail_reset_password = async (
  username: string,
  email: string,
  token: string
) => {
  try {
    await transporter.sendMail(EmailContent_reset_password(username, email, token));
    return true;
  } catch (error) {
    throw error;
  }
};