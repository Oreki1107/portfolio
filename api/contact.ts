import { Resend } from "resend";

declare const process: {
  env: Record<string, string | undefined>;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.TO_EMAIL;

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml({
  name,
  email,
  subject,
  message,
  timestamp,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Portfolio Contact</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:640px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,0.08);">
        <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:28px 32px;color:#ffffff;">
          <h1 style="margin:0 0 8px;font-size:24px;line-height:1.2;">Portfolio Contact</h1>
          <p style="margin:0;font-size:14px;opacity:0.9;">Mohan Krishnan's Portfolio Website</p>
        </div>
        <div style="padding:32px;color:#111827;">
          <p style="margin:0 0 12px;font-size:16px;">You received a new message from your portfolio contact form.</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
            <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(email)}</a></p>
            <p style="margin:0 0 8px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <p style="margin:0 0 8px;"><strong>Submitted:</strong> ${escapeHtml(timestamp)}</p>
            <div style="margin-top:16px;">
              <p style="margin:0 0 8px;font-weight:bold;">Message</p>
              <div style="white-space:pre-wrap;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;line-height:1.6;color:#334155;">${escapeHtml(message)}</div>
            </div>
          </div>
        </div>
        <div style="padding:20px 32px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
          <p style="margin:0;">Generated automatically from Mohan Krishnan's Portfolio Website</p>
        </div>
      </div>
    </body>
  </html>`;
}

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return Response.json(
      {
        success: false,
        message: "Method Not Allowed",
      },
      { status: 405 }
    );
  }

  try {
    const body = (await request.json().catch(() => ({}))) as ContactBody;

    const name = sanitize(body.name || "");
    const email = sanitize(body.email || "");
    const subject = sanitize(body.subject || "");
    const message = body.message?.trim() || "";
    const company = body.company || "";

    if (company.length > 0) {
      return Response.json({ success: true });
    }

    if (!name || !email || !subject || !message) {
      return Response.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 60) {
      return Response.json(
        {
          success: false,
          message: "Invalid name.",
        },
        { status: 400 }
      );
    }

    if (subject.length < 5 || subject.length > 120) {
      return Response.json(
        {
          success: false,
          message: "Subject length is invalid.",
        },
        { status: 400 }
      );
    }

    if (message.length < 20) {
      return Response.json(
        {
          success: false,
          message: "Please provide a more detailed message.",
        },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return Response.json(
        {
          success: false,
          message: "Message is too long.",
        },
        { status: 400 }
      );
    }

    if (!TO_EMAIL) {
      throw new Error("TO_EMAIL is not configured");
    }

    const timestamp = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const html = buildEmailHtml({
      name,
      email,
      subject,
      message,
      timestamp,
    });

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      subject: `🚀 Portfolio Contact • ${subject}`,
      replyTo: email,
      html,
    });

    return Response.json({
      success: true,
      message:
        "Thank you for reaching out! Your message has been delivered successfully.",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Unable to send message.",
      },
      { status: 500 }
    );
  }
}