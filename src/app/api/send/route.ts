import { EmailTemplate } from "@/components/Email-Templates-1";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
/* export async function POST(request) {
  try {

    const { client, subject, html} = request.json();

    const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: client?[client]:["atrossero2001@gmail.com"],
        subject:subject? subject: "Hello world",
        html:html? html: "Hello world"
      });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
} */
