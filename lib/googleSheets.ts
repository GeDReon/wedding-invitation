export interface RsvpPayload {
  firstName: string;
  lastName: string;
  phone: string;
  attendance: "yes" | "no";
  withPartner: "yes" | "no";
  guests: string;
  comment: string;
  createdAt: string;
  userAgent: string;
  language: string;
}

export interface RsvpResponse {
  success: boolean;
  error?: string;
}

export async function submitRsvp(data: RsvpPayload): Promise<RsvpResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    throw new Error("Google Script URL is not configured");
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  try {
    const parsed = JSON.parse(text) as RsvpResponse;
    if (parsed.success) {
      return parsed;
    }
  } catch {
    if (response.ok) {
      return { success: true };
    }
  }

  throw new Error("Failed to submit RSVP");
}

export function buildRsvpPayload(
  formData: {
    firstName: string;
    lastName: string;
    phone?: string;
    attendance: "yes" | "no";
    withPartner?: "yes" | "no";
    guests?: number;
    comment?: string;
  },
  sanitize: (value: string) => string
): RsvpPayload {
  const attending = formData.attendance === "yes";

  return {
    firstName: sanitize(formData.firstName),
    lastName: sanitize(formData.lastName),
    phone: formData.phone ? sanitize(formData.phone) : "",
    attendance: formData.attendance,
    withPartner: attending ? (formData.withPartner ?? "no") : "no",
    guests: attending ? String(formData.guests ?? 1) : "0",
    comment: attending && formData.comment ? sanitize(formData.comment) : "",
    createdAt: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    language: typeof navigator !== "undefined" ? navigator.language : "",
  };
}
