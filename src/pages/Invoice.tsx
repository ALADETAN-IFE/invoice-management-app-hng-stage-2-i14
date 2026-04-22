import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button, Typography } from "../components/common";
import { useMemo, useState } from "react";
import { DeleteConfirmation, InvoiceForm } from "@/components/ui";
import { type StoredInvoice } from "@/data";
import { useInvoices } from "@/context/useInvoices";
import { buildInvoiceFromForm } from "@/utils/invoice-mapper";
import type { InvoiceFormValues } from "@/components/ui/invoice-form";

type InvoiceStatus = "draft" | "pending" | "paid";
type InvoiceDetail = StoredInvoice;

const statusClassMap: Record<
  InvoiceStatus,
  { badge: string; dot: string; label: string }
> = {
  paid: {
    badge: "bg-[rgba(51,214,159,0.08)]",
    dot: "bg-[#33D69F]",
    label: "text-[#33D69F]",
  },
  pending: {
    badge: "bg-[rgba(255,143,0,0.08)]",
    dot: "bg-[#FF8F00]",
    label: "text-[#FF8F00]",
  },
  draft: {
    badge: "bg-[rgba(223,227,250,0.08)]",
    dot: "bg-[#DFE3FA]",
    label: "text-[#DFE3FA]",
  },
};

const formatCurrency = (value: number) => {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const toInputDate = (value: string) => {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, updateInvoice, deleteInvoice } = useInvoices();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Find invoice by id
  const invoice: InvoiceDetail | undefined = useMemo(
    () => invoices.find((inv) => inv.id === id),
    [id, invoices]
  );

  if (!invoice) {
    return (
      <div className="w-full flex justify-center pt-8 sm:pt-15.25 lg:pt-19.25">
        <div className="flex flex-col w-9/10 lg:w-182.5 gap-6">
          <button
            onClick={() => {
              void navigate("/");
            }}
            className="group flex items-center gap-6 text-(--text-primary) hover:text-brand transition-colors cursor-pointer w-fit"
          >
            <ChevronLeft className="h-4 w-4" />
            <Typography
              variant="h3"
              as="span"
              className="group-hover:text-(--text-back)"
            >
              Go back
            </Typography>
          </button>
          <Typography
            variant="h2"
            as="h2"
            className="text-center text-(--text-primary) mt-20"
          >
            Invoice not found
          </Typography>
        </div>
      </div>
    );
  }

  const statusClasses = statusClassMap[invoice.status];
  const markAsPaid = () => {
    if (invoice.status === "paid") {
      return;
    }

    updateInvoice(invoice.id, { ...invoice, status: "paid" });
  };

  const confirmDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    deleteInvoice(invoice.id);
    setIsDeleteOpen(false);
    void navigate("/");
  };

  return (
    <div className="w-full flex justify-center pt-8 sm:pt-15.25 lg:pt-19.25 pb-36.75 sm:pb-13.75">
      <div className="flex flex-col w-9/10 lg:w-182.5 gap-6">
        <button
          onClick={() => {
            void navigate("/");
          }}
          className="group flex items-center gap-6 text-(--text-primary) hover:text-brand transition-colors cursor-pointer w-fit"
        >
          <ChevronLeft className="h-4 w-4" />
          <Typography
            variant="h3"
            as="span"
            className="group-hover:text-(--text-back)"
          >
            Go back
          </Typography>
        </button>

        {/* Header with Status and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-(--bg-surface) rounded-lg px-6 py-6 shadow-sm">
          <div className="flex items-center gap-4 max-sm:justify-between max-sm:w-full">
            <Typography variant="bodyMuted" as="span">
              Status
            </Typography>
            <span
              className={`inline-flex min-w-26 items-center justify-center gap-2 rounded-md px-4 py-3 ${statusClasses.badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${statusClasses.dot}`} />
              <Typography
                variant="h3"
                as="span"
                className={`capitalize ${statusClasses.label}`}
              >
                {invoice.status}
              </Typography>
            </span>
          </div>
          <div className="hidden sm:flex gap-2 sm:w-auto">
            <Button
              variant="draft"
              size="md"
              className="rounded-3xl!"
              onClick={() => {
                setIsEditOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="delete"
              size="md"
              className="rounded-3xl!"
              onClick={() => {
                setIsDeleteOpen(true);
              }}
            >
              Delete
            </Button>
            {invoice.status !== "paid" && (
              <Button
                variant="primary"
                size="md"
                className="rounded-3xl!"
                onClick={markAsPaid}
              >
                Mark as Paid
              </Button>
            )}
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-(--bg-surface) rounded-lg px-6 py-8 shadow-sm">
          <div className="mb-12 space-y-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Typography variant="h3" as="p">
                  <span className="text-muted font-bold">#</span>
                  {invoice.id}
                </Typography>
                <Typography variant="bodyMuted" as="p">
                  {invoice.description}
                </Typography>
              </div>

              <Typography
                variant="body"
                as="p"
                className="text-(--text-secondary) sm:text-right"
              >
                {invoice.billFrom.street}
                <br />
                {invoice.billFrom.city}
                <br />
                {invoice.billFrom.postCode}
                <br />
                {invoice.billFrom.country}
              </Typography>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-8">
              <div className="space-y-8">
                <div>
                  <Typography variant="bodyMuted" as="p" className="mb-3">
                    Invoice Date
                  </Typography>
                  <Typography
                    variant="h3"
                    as="p"
                    className="text-(--text-primary)"
                  >
                    {invoice.invoiceDate}
                  </Typography>
                </div>

                <div>
                  <Typography variant="bodyMuted" as="p" className="mb-3">
                    Payment Due
                  </Typography>
                  <Typography
                    variant="h3"
                    as="p"
                    className="text-(--text-primary)"
                  >
                    {invoice.paymentDue}
                  </Typography>
                </div>
              </div>

              <div>
                <Typography variant="bodyMuted" as="p" className="mb-3">
                  Bill To
                </Typography>
                <Typography
                  variant="h3"
                  as="p"
                  className="text-(--text-primary) mb-2"
                >
                  {invoice.billTo.name}
                </Typography>
                <Typography
                  variant="body"
                  as="p"
                  className="text-(--text-muted)"
                >
                  {invoice.billTo.street}
                  <br />
                  {invoice.billTo.city}
                  <br />
                  {invoice.billTo.postCode}
                  <br />
                  {invoice.billTo.country}
                </Typography>
              </div>

              <div>
                <Typography variant="bodyMuted" as="p" className="mb-3">
                  Sent to
                </Typography>
                <Typography
                  variant="body"
                  as="p"
                  className="text-(--text-primary)"
                >
                  {invoice.sentTo}
                </Typography>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <div className="rounded-t-lg bg-(--item-table) px-6 py-6 sm:hidden">
              <div className="space-y-6">
                {invoice.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <Typography
                        variant="h3"
                        as="p"
                        className="text-(--text-primary)"
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body"
                        as="p"
                        className="mt-2 text-(--text-secondary)"
                      >
                        {item.qty} x £ {formatCurrency(item.price)}
                      </Typography>
                    </div>
                    <Typography
                      variant="h3"
                      as="p"
                      className="text-(--text-primary)"
                    >
                      £ {formatCurrency(item.total)}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden rounded-t-lg bg-(--item-table) sm:block">
              <div className="grid grid-cols-12 gap-4 px-6 py-4">
                <Typography
                  variant="bodyMuted"
                  as="p"
                  className="col-span-5 md:col-span-6"
                >
                  Item Name
                </Typography>
                <Typography
                  variant="bodyMuted"
                  as="p"
                  className="col-span-1 md:col-span-2 text-center"
                >
                  QTY.
                </Typography>
                <Typography
                  variant="bodyMuted"
                  as="p"
                  className="col-span-3 md:col-span-2 text-right"
                >
                  Price
                </Typography>
                <Typography
                  variant="bodyMuted"
                  as="p"
                  className="col-span-3 md:col-span-2 text-right"
                >
                  Total
                </Typography>
              </div>

              {invoice.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 px-6 py-4">
                  <Typography
                    variant="h3"
                    as="p"
                    className="col-span-5 md:col-span-6 text-(--text-primary)"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="h3"
                    as="p"
                    className="col-span-1 md:col-span-2 text-center text-(--text-secondary)"
                  >
                    {item.qty}
                  </Typography>
                  <Typography
                    variant="h3"
                    as="p"
                    className="col-span-3 md:col-span-2 text-right text-(--text-secondary)"
                  >
                    £ {formatCurrency(item.price)}
                  </Typography>
                  <Typography
                    variant="h3"
                    as="p"
                    className="col-span-3 md:col-span-2 text-right text-(--text-primary)"
                  >
                    £ {formatCurrency(item.total)}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* Amount Due */}
          <div className="flex items-center justify-between bg-(--invoice-amount-bg) text-(--text-page-reverse) rounded-b-lg px-6 py-6">
            <Typography variant="body" as="span" className="text-white">
              <span className="sm:hidden">Grand Total</span>
              <span className="hidden sm:inline">Amount Due</span>
            </Typography>
            <Typography variant="h2" as="p" className="text-white">
              £ {formatCurrency(invoice.total)}
            </Typography>
          </div>
        </div>
      </div>
      {isEditOpen ? (
        <InvoiceForm
          isOpen={isEditOpen}
          mode="edit"
          initialValues={{
            invoiceId: invoice.id,
            status: invoice.status,
            senderStreet: invoice.billFrom.street,
            senderCity: invoice.billFrom.city,
            senderPostCode: invoice.billFrom.postCode,
            senderCountry: invoice.billFrom.country,
            clientName: invoice.billTo.name,
            clientEmail: invoice.sentTo,
            clientStreet: invoice.billTo.street,
            clientCity: invoice.billTo.city,
            clientPostCode: invoice.billTo.postCode,
            clientCountry: invoice.billTo.country,
            invoiceDate: toInputDate(invoice.invoiceDate),
            paymentTerms: 30,
            projectDescription: invoice.description,
            items: invoice.items.map((item, index) => ({
              id: `${invoice.id}-${String(index)}`,
              name: item.name,
              quantity: item.qty,
              price: item.price,
            })),
          }}
          onSaveChanges={(values: InvoiceFormValues) => {
            const nextInvoice = buildInvoiceFromForm(values, {
              status: values.status,
              idOverride: invoice.id,
            });
            updateInvoice(invoice.id, nextInvoice);
          }}
          onClose={() => {
            setIsEditOpen(false);
          }}
        />
      ) : null}
      <div className="flex gap-2 fixed bottom-0 w-full justify-center items-center py-5.25 bg-(--sidebar-bg) sm:hidden">
        <Button
          variant="draft"
          size="md"
          className="rounded-3xl!"
          onClick={() => {
            setIsEditOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="delete"
          size="md"
          className="rounded-3xl!"
          onClick={() => {
            setIsDeleteOpen(true);
          }}
        >
          Delete
        </Button>
        {invoice.status !== "paid" && (
          <Button
            variant="primary"
            size="md"
            className="rounded-3xl!"
            onClick={markAsPaid}
          >
            Mark as Paid
          </Button>
        )}
      </div>
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        invoiceId={invoice.id}
        onCancel={() => {
          setIsDeleteOpen(false);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Invoice;
