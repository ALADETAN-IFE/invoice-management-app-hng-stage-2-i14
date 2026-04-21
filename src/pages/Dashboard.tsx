import { useMemo, useState } from "react";
import { DashboardHeader, InvoiceCards } from "@/components/ui";
import invoiceData from "@/data";

type InvoiceStatus = "draft" | "pending" | "paid";

interface Invoice {
  id: string;
  dueDate: string;
  clientName: string;
  total: number;
  status: InvoiceStatus;
};

const invoices = invoiceData as Invoice[];

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus | null>(null);

  const filteredInvoices = useMemo(() => {
    if (!selectedStatus) {
      return invoices;
    }

    return invoices.filter((invoice) => invoice.status === selectedStatus);
  }, [selectedStatus]);

  return (
    <div className="w-full h-full flex justify-center pt-8 sm:pt-15.25 lg:pt-19.25">
      <div className="flex flex-col w-9/10 lg:w-182.5">
        <DashboardHeader
          totalCount={invoices.length}
          filteredCount={filteredInvoices.length}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
        <InvoiceCards invoices={filteredInvoices} />
      </div>
    </div>
  );
};

export default Dashboard;
