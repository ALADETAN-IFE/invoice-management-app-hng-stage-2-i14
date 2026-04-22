import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Cross } from "lucide-react";
import { Button, Typography } from "../common";

type InvoiceStatus = "draft" | "pending" | "paid";

interface DashboardHeaderProps {
  totalCount: number;
  filteredCount: number;
  selectedStatus: InvoiceStatus | null;
  onStatusChange: (status: InvoiceStatus | null) => void;
  onCreateInvoice: () => void;
}

const STATUS_OPTIONS: InvoiceStatus[] = ["draft", "pending", "paid"];

const DashboardHeader = ({
  totalCount,
  filteredCount,
  selectedStatus,
  onStatusChange,
  onCreateInvoice,
}: DashboardHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [mobileSummaryText, setMobileSummaryText] = useState("");
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!filterRef.current) {
        return;
      }

      if (!filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  setTimeout(() => {
    setSummaryText(selectedStatus
      ? `There ${filteredCount > 1 ? "are" : "is"} ${String(filteredCount)} ${selectedStatus} ${filteredCount > 1 ? "invoices" : "invoice"}`
      : `There are ${String(totalCount)} total invoices`);
    setMobileSummaryText(selectedStatus
      ? `${String(filteredCount)} ${selectedStatus} ${filteredCount > 1 ? "invoices" : "invoice"}`
      : `${String(totalCount)} total invoices`);
  }, 2000);

  const handleStatusSelect = (status: InvoiceStatus) => {
    if (selectedStatus === status) {
      onStatusChange(null);
      return;
    }

    onStatusChange(status);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <Typography variant="h1" as="h1">
          Invoice
        </Typography>
        <Typography variant="body" as="p" className="sm:hidden flex">
          {mobileSummaryText}
        </Typography>
        <Typography variant="body" as="p" className="hidden sm:flex">
          {summaryText}
        </Typography>
      </div>
      <div className="flex gap-4.5 sm:gap-10 items-center justify-center">
        <div className="relative" ref={filterRef}>
          <button
            type="button"
            onClick={() => {
              setIsFilterOpen((previous) => !previous);
            }}
            className="inline-flex cursor-pointer items-center gap-3 rounded-md py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-primary)"
            aria-expanded={isFilterOpen}
            aria-haspopup="menu"
          >
            <Typography variant="h3" as="span" className="sm:hidden flex">
              Filter
            </Typography>
            <Typography variant="h3" as="span" className="hidden sm:flex">
              Filter by status
            </Typography>
            {isFilterOpen ? (
              <ChevronUp className="h-4 w-4 text-(--accent-primary)" />
            ) : (
              <ChevronDown className="h-4 w-4 text-(--accent-primary)" />
            )}
          </button>

          {isFilterOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-12 z-20 w-48 rounded-lg bg-(--bg-surface) p-4 shadow-[0_10px_20px_rgba(72,84,159,0.25)]"
            >
              <div className="flex flex-col gap-3">
                {STATUS_OPTIONS.map((status) => {
                  const isSelected = selectedStatus === status;

                  return (
                    <button
                      key={status}
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={isSelected}
                      onClick={() => {
                        handleStatusSelect(status);
                      }}
                      className="inline-flex cursor-pointer items-center gap-3 text-left"
                    >
                      <span
                        className={`inline-flex h-4 w-4 items-center justify-center rounded-sm border ${
                          isSelected
                            ? "border-(--accent-primary) bg-(--accent-primary)"
                            : "border-(--border-default) bg-(--bg-elevated) hover:border-(--accent-primary)"
                        }`}
                      >
                        {isSelected ? (
                          <Check className="h-3 w-3 text-white" />
                        ) : null}
                      </span>
                      <Typography variant="h3" as="span" className="capitalize">
                        {status}
                      </Typography>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        <Button
          variant="primary"
          startIcon={<Cross fill="current" size={10} />}
          onClick={onCreateInvoice}
          disabled={!summaryText || !mobileSummaryText}
        >
          New Invoice
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
