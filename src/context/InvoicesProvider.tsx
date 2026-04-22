import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  loadInvoicesFromStorage,
  persistInvoices,
  type StoredInvoice,
} from "@/data";
import {
  InvoicesContext,
} from "./invoices-context";

export function InvoicesProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<StoredInvoice[]>(() =>
    loadInvoicesFromStorage()
  );

  useEffect(() => {
    persistInvoices(invoices);
  }, [invoices]);

  const value = useMemo(
    () => ({
      invoices,
      createInvoice: (invoice: StoredInvoice) => {
        setInvoices((current) => {
          if (current.some((existing) => existing.id === invoice.id)) {
            return current;
          }

          return [invoice, ...current];
        });
      },
      updateInvoice: (id: string, invoice: StoredInvoice) => {
        setInvoices((current) =>
          current.map((existing) => (existing.id === id ? invoice : existing))
        );
      },
      deleteInvoice: (id: string) => {
        setInvoices((current) => current.filter((existing) => existing.id !== id));
      },
    }),
    [invoices]
  );

  return (
    <InvoicesContext.Provider value={value}>{children}</InvoicesContext.Provider>
  );
}
