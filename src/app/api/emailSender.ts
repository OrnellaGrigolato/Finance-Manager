import nodemailer from "nodemailer";
import { EmailTemplate } from "@/components/Email-Templates-1";
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

  return {
    from: email_finance,
    to: email,
    subject: `Account verification, Finance Manager`,
    html: `<div>
    <h1 style="margin-botton:20px;font-size:30px;">Hello, ${
      username.split(" ")[0]
    }!</h1>
    <p>We see you are trying to verify your account!

    Please click on the link below to verify your email (it will expire in 1hs):
    <a style="display:block;margin-top:20px;margin-bottom:20px;color:#8A22F0;font-weight: bold;text-align:center" href=${verificationUrl}>Click here to verify your account</a>
   

    We send our regards, Finance Manager.</p>
  </div>`,
  };
};

const EmailContent = (username: string, email: string, token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/api/users/verify?token=${token}`;

  return {
    from: email_finance,
    to: email,
    subject: `Welcome to Finance Manager, ${username}`,
    html: `<div>
    <h1 style="margin-botton:20px;font-size:30px;">Welcome, ${
      username.split(" ")[0]
    }!</h1>
    <p>You just signed up to Finance Manager!

    Please click on the link below to verify your email (it will expire in 1hs):
    <a style="display:block;margin-top:20px;margin-bottom:20px;color:#8A22F0;font-weight: bold;text-align:center" href=${verificationUrl}>Click here to verify your account</a>
    Remember you can resend this link by going to: Profile -> Verify account

    We’re excited to have you on board and we’d love to say thank you on behalf of our team for choosing us to help you register your finances. Best regards, Finance Manager.</p>
  </div>`,
  };
};

const EmailContent_reset_password = (
  username: string,
  email: string,
  token: string
) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/reset-password/${token}`;

  return {
    from: email_finance,
    to: email,
    subject: `Reset your Finance Manager password.`,
    html: '<div><h1  style="margin-botton:20px;font-size:30px;"> Hello, Finance Manager speaking!</h1> <p>  Please click on the link below to reset your password and unlock your account (it will expire in 1hs):  <a style="display:block;margin-top:20px;margin-bottom:20px;color:#8A22F0;font-weight: bold;text-align:center" href=${verificationUrl}>Click here to change your password</a> Remember you can resend this link by going to: Login -> Forgot password</p></div>',
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
    await transporter.sendMail(
      EmailContent_reset_password(username, email, token)
    );
    return true;
  } catch (error) {
    throw error;
  }
};
