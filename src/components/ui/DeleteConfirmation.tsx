import { useEffect } from "react";
import { Button, Typography } from "../common";

type DeleteConfirmationProps = {
  isOpen: boolean;
  invoiceId: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmation({
  isOpen,
  invoiceId,
  onCancel,
  onConfirm,
}: DeleteConfirmationProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <button
        type="button"
        aria-label="Close delete confirmation"
        className="absolute inset-0 bg-black/45"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-md rounded-lg bg-(--bg-surface) px-8 py-8 shadow-[0_24px_24px_rgba(0,0,0,0.18)]">
        <Typography variant="h2" as="h2">
          Confirm Deletion
        </Typography>

        <Typography variant="body" as="p" className="mt-4 leading-[22px]">
          Are you sure you want to delete invoice{" "}
          <span className="font-bold">#{invoiceId}</span>? This action cannot be
          undone.
        </Typography>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button
            variant="draft"
            size="md"
            className="rounded-3xl!"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="delete"
            size="md"
            className="rounded-3xl!"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
