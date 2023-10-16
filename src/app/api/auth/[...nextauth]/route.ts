//@ts-nocheck
import { prisma } from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import Auth0Provider from "next-auth/providers/auth0";
import  EmailProvider  from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  /* adapter: PrismaAdapter(prisma), */
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER
    }), 
   /*  EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }), */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],callbacks:{
    async signIn({profile}) {
      try{
        const user = await prisma.users.findUnique({
          where: {
            email: profile?.email,
          }})
        if(!user){
          const result = await prisma.users.create({
            data:{
                username:profile?.name,
                password:'',
                email:profile?.email
            }
        })
        }
        return true
      }catch(error){
        console.log(error)
        return false
      }
    },
  }
});

export { handler as GET, handler as POST };

  
/*  */
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