import { useState } from "react";

export type InvoiceFormMode = "create" | "edit";

export interface FormItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceFormValues {
  invoiceId: string;
  senderStreet: string;
  senderCity: string;
  senderPostCode: string;
  senderCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreet: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDate: string;
  paymentTerms: number;
  projectDescription: string;
  items: FormItem[];
  status: "draft" | "pending" | "paid";
}

export type InvoiceFieldErrorKey =
  | "senderStreet"
  | "senderCity"
  | "senderPostCode"
  | "senderCountry"
  | "clientName"
  | "clientEmail"
  | "clientStreet"
  | "clientCity"
  | "clientPostCode"
  | "clientCountry"
  | "invoiceDate"
  | "projectDescription"
  | "paymentTerms";

export interface InvoiceFormItemError {
  name?: string;
  quantity?: string;
  price?: string;
}

export interface InvoiceFormErrors {
  fields: Partial<Record<InvoiceFieldErrorKey, string>>;
  items: Partial<Record<string, InvoiceFormItemError>>;
  general: string[];
}

export interface InvoiceFormProps {
  isOpen: boolean;
  mode: InvoiceFormMode;
  initialValues?: Partial<InvoiceFormValues>;
  onClose: () => void;
  onSaveDraft?: (values: InvoiceFormValues) => void;
  onSaveAndSend?: (values: InvoiceFormValues) => void;
  onSaveChanges?: (values: InvoiceFormValues) => void;
}

export const PAYMENT_TERMS = [1, 7, 14, 30] as const;

export const formatMoney = (value: number) =>
  value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const createEmptyItem = (): FormItem => ({
  id: crypto.randomUUID(),
  name: "",
  quantity: 1,
  price: 0,
});

const createInvoiceCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const prefix = `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}`;
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `${prefix}${suffix}`;
};

const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export const createEmptyErrors = (): InvoiceFormErrors => ({
  fields: {},
  items: {},
  general: [],
});

const createDefaultValues = (): InvoiceFormValues => ({
  invoiceId: createInvoiceCode(),
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  invoiceDate: "",
  paymentTerms: 30,
  projectDescription: "",
  items: [],
  status: "draft",
});

export const validateInvoiceForm = (
  values: InvoiceFormValues,
  mode: InvoiceFormMode
): InvoiceFormErrors => {
  const errors = createEmptyErrors();

  const requiredFields: InvoiceFieldErrorKey[] = [
    "senderStreet",
    "senderCity",
    "senderPostCode",
    "senderCountry",
    "clientName",
    "clientEmail",
    "clientStreet",
    "clientCity",
    "clientPostCode",
    "clientCountry",
    "invoiceDate",
    "projectDescription",
  ];

  const missingRequiredFieldCount = requiredFields.reduce((count, field) => {
    if (!String(values[field]).trim()) {
      errors.fields[field] = "can't be empty";
      return count + 1;
    }
    return count;
  }, 0);

  if (missingRequiredFieldCount > 0) {
    errors.general.push("All fields must be added");
  }

  if (!isEmail(values.clientEmail)) {
    errors.fields.clientEmail = "invalid email address";
  }

  if (!Number.isFinite(values.paymentTerms) || values.paymentTerms <= 0) {
    errors.fields.paymentTerms = "invalid payment term";
  }

  if (values.items.length === 0) {
    errors.general.push("An item must be added");
  }

  values.items.forEach((item) => {
    const itemErrors: InvoiceFormItemError = {};

    if (!item.name.trim()) {
      itemErrors.name = "Required";
    }

    if (!Number.isFinite(item.quantity) || item.quantity <= 0) {
      itemErrors.quantity = "Invalid";
    }

    if (!Number.isFinite(item.price) || item.price <= 0) {
      itemErrors.price = "Invalid";
    }

    if (Object.keys(itemErrors).length > 0) {
      errors.items[item.id] = itemErrors;
    }
  });

  if (mode === "create" && !values.invoiceId.trim()) {
    errors.general.push("Invoice id is required");
  }

  return errors;
};

export const mergeInitialValues = (
  incoming?: Partial<InvoiceFormValues>
): InvoiceFormValues => {
  const base = createDefaultValues();

  if (!incoming) {
    return base;
  }

  return {
    ...base,
    ...incoming,
    items:
      incoming.items && incoming.items.length > 0
        ? incoming.items.map((item) => ({
            ...item,
            id: item.id || crypto.randomUUID(),
          }))
        : base.items,
  };
};

export const useInvoiceFormValues = (
  initialValues?: Partial<InvoiceFormValues>
) => {
  const [formValues, setFormValues] = useState<InvoiceFormValues>(() =>
    mergeInitialValues(initialValues)
  );

  const updateField = <K extends keyof InvoiceFormValues>(
    field: K,
    value: InvoiceFormValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const updateItem = (id: string, patch: Partial<FormItem>) => {
    setFormValues((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }));
  };

  const addItem = () => {
    setFormValues((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyItem()],
    }));
  };

  const removeItem = (id: string) => {
    setFormValues((prev) => {
      if (prev.items.length === 1) {
        return prev;
      }

      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
  };

  return {
    formValues,
    updateField,
    updateItem,
    addItem,
    removeItem,
  };
};
