import { createContext } from "react";
import type { StoredInvoice } from "@/data";

export interface InvoicesContextValue {
  invoices: StoredInvoice[];
  createInvoice: (invoice: StoredInvoice) => void;
  updateInvoice: (id: string, invoice: StoredInvoice) => void;
  deleteInvoice: (id: string) => void;
}

export const InvoicesContext = createContext<InvoicesContextValue | undefined>(
  undefined
);
