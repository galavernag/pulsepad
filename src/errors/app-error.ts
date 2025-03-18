import { toast } from "sonner";

export class AppError extends Error {
  constructor(subject: string, message: string) {
    super(message);
    this.name = subject;
    this.message = message;
    toast.error(message, {
      description: `
        Error code: ${subject}. Please contact the Pulsepad team.
      `,
    });
  }
}
