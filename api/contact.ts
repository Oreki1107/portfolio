import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import ContactEmail from "../emails/contactEmails";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.TO_EMAIL!;

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string; // Honeypot field (must stay empty)
}

function sanitize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const body = req.body as ContactBody;

    const name = sanitize(body.name || "");
    const email = sanitize(body.email || "");
    const subject = sanitize(body.subject || "");
    const message = body.message?.trim() || "";
    const company = body.company || "";

    // Honeypot spam protection
    if (company.length > 0) {
      return res.status(200).json({
        success: true,
      });
    }

    // Validation

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    if (name.length < 2 || name.length > 60) {
      return res.status(400).json({
        success: false,
        message: "Invalid name.",
      });
    }

    if (subject.length < 5 || subject.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Subject length is invalid.",
      });
    }

    if (message.length < 20) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a more detailed message.",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long.",
      });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",

      to: TO_EMAIL,

      subject: `🚀 Portfolio Contact • ${subject}`,

      replyTo: email,

      react: ContactEmail({
        name,
        email,
        subject,
        message,
      }),
    });

    return res.status(200).json({
      success: true,
      message:
        "Thanks! Your message has been sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while sending your message.",
    });
  }
}