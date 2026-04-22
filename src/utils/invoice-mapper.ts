import type { StoredInvoice, InvoiceStatus } from "@/data";
import type { InvoiceFormValues } from "@/components/ui/invoice-form";

const formatDisplayDate = (inputDate: string) => {
  const parsed = new Date(inputDate);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const addDays = (inputDate: string, days: number) => {
  const parsed = new Date(inputDate);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  parsed.setDate(parsed.getDate() + days);
  return formatDisplayDate(parsed.toISOString());
};

const generateInvoiceCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const prefix = `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}`;
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `${prefix}${suffix}`;
};

interface BuildInvoiceOptions {
  status: InvoiceStatus;
  idOverride?: string;
}

export const buildInvoiceFromForm = (
  values: InvoiceFormValues,
  options: BuildInvoiceOptions
): StoredInvoice => {
  const items = values.items.map((item) => {
    const total = item.quantity * item.price;
    return {
      name: item.name,
      qty: item.quantity,
      price: item.price,
      total,
    };
  });

  const invoiceDate = formatDisplayDate(values.invoiceDate);
  const paymentDue = addDays(values.invoiceDate, values.paymentTerms);
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return {
    id: options.idOverride ?? (values.invoiceId || generateInvoiceCode()),
    status: options.status,
    description: values.projectDescription,
    dueDate: paymentDue,
    invoiceDate,
    paymentDue,
    clientName: values.clientName,
    sentTo: values.clientEmail,
    billFrom: {
      street: values.senderStreet,
      city: values.senderCity,
      postCode: values.senderPostCode,
      country: values.senderCountry,
    },
    billTo: {
      name: values.clientName,
      street: values.clientStreet,
      city: values.clientCity,
      postCode: values.clientPostCode,
      country: values.clientCountry,
    },
    items,
    total,
  };
};
