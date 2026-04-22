import { useMemo, useState } from "react";
import { DashboardHeader, InvoiceCards, InvoiceForm } from "@/components/ui";
import { type InvoiceStatus } from "@/data";
import { useInvoices } from "@/context/useInvoices";
import { buildInvoiceFromForm } from "@/utils/invoice-mapper";
import type { InvoiceFormValues } from "@/components/ui/invoice-form";

const Dashboard = () => {
  const { invoices, createInvoice } = useInvoices();
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredInvoices = useMemo(() => {
    if (!selectedStatus) {
      return invoices;
    }

    return invoices.filter((invoice) => invoice.status === selectedStatus);
  }, [invoices, selectedStatus]);

  const handleCreateInvoice = (values: InvoiceFormValues, status: InvoiceStatus) => {
    const nextInvoice = buildInvoiceFromForm(values, { status });
    createInvoice(nextInvoice);
  };

  return (
    <div className="w-full h-full flex justify-center pt-8 sm:pt-15.25 lg:pt-19.25">
      <div className="flex flex-col w-9/10 lg:w-182.5">
        <DashboardHeader
          totalCount={invoices.length}
          filteredCount={filteredInvoices.length}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onCreateInvoice={() => {
            setIsCreateOpen(true);
          }}
        />
        <InvoiceCards invoices={filteredInvoices} />

        {isCreateOpen ? (
          <InvoiceForm
            isOpen={isCreateOpen}
            mode="create"
            onSaveDraft={(values: InvoiceFormValues) => {
              handleCreateInvoice(values, "draft");
            }}
            onSaveAndSend={(values: InvoiceFormValues) => {
              handleCreateInvoice(values, "pending");
            }}
            onClose={() => {
              setIsCreateOpen(false);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
