import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Typography } from "../common";

type InvoiceStatus = "draft" | "pending" | "paid";

interface Invoice {
  id: string;
  dueDate: string;
  clientName: string;
  total: number;
  status: InvoiceStatus;
}

interface InvoiceCardProps {
  invoices: Invoice[];
}

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

const InvoiceCard = (invoice: Invoice) => {
  const statusClasses = statusClassMap[invoice.status];

  return (
    <article
      key={invoice.id}
      className="grid grid-cols-2 max-sm:justify-between gap-4 rounded-lg bg-(--bg-surface) px-6 py-6 shadow-sm sm:grid-cols-[1fr_1fr_1.2fr_1fr_auto] hover:border hover:border-(--accent-primary) cursor-pointer sm:items-center"
    >
      <Typography variant="h3" as="p">
        <span className="text-muted font-bold">#</span>
        {invoice.id}
      </Typography>

      <Typography variant="bodyMuted" as="p" className="max-sm:pt-2">
        Due {invoice.dueDate}
      </Typography>

      <Typography
        variant="body"
        as="p"
        className="sm:col-span-1 text-(--text-tetiary) max-sm:col-start-2 max-sm:row-start-1 max-sm:text-end"
      >
        {invoice.clientName}
      </Typography>

      <Typography
        variant="h3"
        as="p"
        className="text-(--text-primary) max-sm:row-start-3"
      >
        £ {formatCurrency(invoice.total)}
      </Typography>

      <div className="flex items-center gap-4 max-sm:justify-end max-sm:row-start-2 max-sm:col-start-2 max-sm:row-span-2">
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

        <ChevronRight className="h-4 w-4 text-(--accent-primary) max-sm:hidden" />
      </div>
    </article>
  );
};

const InvoiceCards = ({ invoices }: InvoiceCardProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = listRef.current;

    if (!element) {
      return;
    }

    const updateOverflowState = () => {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    };

    updateOverflowState();

    const observer = new ResizeObserver(updateOverflowState);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [invoices]);

  return (
    <div
      ref={listRef}
      className={`mt-13.75 lg:mt-16 flex flex-col gap-4 overflow-y-auto max-h-screen pb-7 ${
        isOverflowing ? "pr-2" : ""
      }`}
    >
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} {...invoice} />
      ))}
    </div>
  );
};

export default InvoiceCards;
