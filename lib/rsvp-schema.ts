import { z } from "zod";
import { sanitizeString } from "@/lib/utils";

const safeString = (min: number, max: number, fieldName: string) =>
  z
    .string()
    .transform((val) => sanitizeString(val))
    .pipe(
      z
        .string()
        .min(min, `${fieldName} кемінде ${min} таңбадан тұруы керек`)
        .max(max, `${fieldName} тым ұзын`)
    );

export const rsvpSchema = z
  .object({
    firstName: safeString(2, 50, "Аты"),
    lastName: safeString(2, 50, "Тегі"),
    phone: z
      .string()
      .optional()
      .transform((val) => (val ? sanitizeString(val) : "")),
    attendance: z.enum(["yes", "no"], {
      required_error: "Келесіз бе — міндетті түрде көрсетіңіз",
    }),
    withPartner: z.enum(["yes", "no"]).optional(),
    guests: z.coerce.number().optional(),
    comment: z
      .string()
      .optional()
      .transform((val) => (val ? sanitizeString(val) : "")),
  })
  .superRefine((data, ctx) => {
    if (data.attendance === "yes") {
      if (!data.withPartner) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Жұбайыңызбен келесіз бе — көрсетіңіз",
          path: ["withPartner"],
        });
      }
      if (data.guests === undefined || data.guests < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Кемінде 1 қонақ",
          path: ["guests"],
        });
      }
      if (data.guests !== undefined && data.guests > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ең көбі 10 қонақ",
          path: ["guests"],
        });
      }
    }
  });

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
