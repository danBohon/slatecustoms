"use server";

import { Resend } from "resend";

type ActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const subject = (formData.get("subject") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return { status: "error", message: "All fields are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_EMAIL env vars");
    return {
      status: "error",
      message: "Server configuration error — please try again later.",
    };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Danerd Contact <onboarding@resend.dev>",
    to,
    replyTo: `${name} <${email}>`,
    subject: `New inquiry: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      status: "error",
      message: "Failed to send — please email me directly.",
    };
  }

  return { status: "success" };
}
