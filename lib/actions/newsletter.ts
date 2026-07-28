"use server";

import { subscribeToCommunityAudience } from "@/lib/mailchimp";

export interface NewsletterActionState {
  status: "idle" | "success" | "error";
  message: string;
}

interface MailchimpApiError {
  status?: number;
  response?: {
    body?: {
      title?: string;
      detail?: string;
    };
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(
  _previousState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const honeypot = String(formData.get("company") ?? "");

  if (honeypot) {
    return {
      status: "success",
      message: "Revisá tu email para confirmar la suscripción.",
    };
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Ingresá un email válido.",
    };
  }

  try {
    await subscribeToCommunityAudience(email);

    return {
      status: "success",
      message: "Revisá tu email para confirmar la suscripción.",
    };
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpApiError;
    const title = mailchimpError.response?.body?.title;

    if (title === "Member Exists") {
      return {
        status: "success",
        message: "Este email ya forma parte de nuestra comunidad.",
      };
    }

    console.error("[Mailchimp] Error de suscripción", {
      status: mailchimpError.status,
      title,
      detail: mailchimpError.response?.body?.detail,
    });

    return {
      status: "error",
      message: "No pudimos completar la suscripción. Intentá nuevamente.",
    };
  }
}
