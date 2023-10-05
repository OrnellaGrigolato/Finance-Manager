import { prisma } from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import Email from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    /* Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }), */
  ],
});

export { handler as GET, handler as POST };
/* 
CNAME	em8848.gmail	
u37986916.wl167.sendgrid.net	
CNAME	s1._domainkey.gmail	
s1.domainkey.u37986916.wl167.sendgrid.net	
CNAME	s2._domainkey.gmail	
s2.domainkey.u37986916.wl167.sendgrid.net */
/* {
      id: 'sendgrid',
      type: 'email',
      async sendVerificationRequest({identifier: email, url}) {
        // Call the cloud Email provider API for sending emails
        // See https://docs.sendgrid.com/api-reference/mail-send/mail-send
        const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
          // The body format will vary depending on provider, please see their documentation
          // for further details.
          body: JSON.stringify({
            personalizations: [{ to: [{ email }] }],
            from: { email: "noreply@company.com" },
            subject: "Sign in to Your page",
            content: [
              {
                type: "text/html",
                value: `Please click here to authenticate - ${url}`,
              },
            ],
          }),
          headers: {
            // Authentication will also vary from provider to provider, please see their docs.
            Authorization: `Bearer ${process.env.SENDGRID_API}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        })

        if (!response.ok) {
          const { errors } = await response.json()
          throw new Error(JSON.stringify(errors))
        }
      }
    }, */