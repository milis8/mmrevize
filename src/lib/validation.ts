import { z } from 'zod';
import type { ContactFormData, ValidationResult } from '../types/contact-form';

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Zadejte jméno (minimálně 2 znaky).'),
  email: z.email('Zadejte platnou emailovou adresu.'),
  phone: z.string().trim().min(9, 'Zadejte platné telefonní číslo.'),
  message: z.string().trim().min(10, 'Zpráva musí mít alespoň 10 znaků.'),
  honeypot: z.string().max(0, 'Neplatné odeslání.'),
});

/**
 * Ověří vstup z kontaktního formuláře přes Zod schéma.
 * Voláno jak na klientu (UX), tak fallback při server-side zpracování.
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    return { valid: true };
  }

  const errors: ValidationResult['errors'] = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactFormData;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { valid: false, errors };
}
