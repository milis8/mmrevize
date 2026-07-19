export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
}

export interface ValidationResult {
  valid: boolean;
  errors?: Partial<Record<keyof ContactFormData, string>>;
}
