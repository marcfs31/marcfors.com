import { DEV_EMAIL } from "./site";

export function mailTo(subject: string, email = DEV_EMAIL): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
