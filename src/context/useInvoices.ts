import { useContext } from "react";
import {
  InvoicesContext,
  type InvoicesContextValue,
} from "./invoices-context";

export function useInvoices(): InvoicesContextValue {
  const context = useContext(InvoicesContext);

  if (!context) {
    throw new Error("useInvoices must be used within InvoicesProvider");
  }

  return context;
}
