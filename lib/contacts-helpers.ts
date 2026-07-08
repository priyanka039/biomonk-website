import type { ContactRow } from "@/lib/cms";

export function whatsappFromContacts(contacts: ContactRow[]): string {
  const c = contacts.find((x) => x.type === "whatsapp");
  return c?.value?.replace(/\D/g, "") ?? "";
}

export function whatsappLinkFromContacts(
  contacts: ContactRow[],
  message?: string
): string {
  const num = whatsappFromContacts(contacts);
  const base = `https://wa.me/${num || "919999999999"}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function contactValue(contacts: ContactRow[], type: string): string {
  return contacts.find((c) => c.type === type)?.value ?? "";
}

export function contactLabel(contacts: ContactRow[], type: string): string {
  return contacts.find((c) => c.type === type)?.label ?? type;
}
