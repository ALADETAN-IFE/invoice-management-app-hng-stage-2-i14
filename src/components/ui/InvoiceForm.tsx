import { useEffect, useState } from "react";
import { Button, Input, Typography } from "../common";

import {
  createEmptyErrors,
  formatMoney,
  PAYMENT_TERMS,
  useInvoiceFormValues,
  validateInvoiceForm,
} from "./invoice-form";

import type { InvoiceFormProps } from "./invoice-form";

export default function InvoiceForm({
  isOpen,
  mode,
  initialValues,
  onClose,
  onSaveDraft,
  onSaveAndSend,
  onSaveChanges,
}: InvoiceFormProps) {
  const itemInputTextClass = "text-[15px] leading-3.75 tracking-[-0.25px]";
  const { formValues, updateField, updateItem, addItem, removeItem } =
    useInvoiceFormValues(initialValues);
  const [errors, setErrors] = useState(createEmptyErrors());

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const submitAsDraft = () => {
    onSaveDraft?.({ ...formValues, status: "draft" });
    setErrors(createEmptyErrors());
    onClose();
  };

  const submitPrimary = () => {
    if (mode === "edit" && formValues.status === "draft") {
      onSaveChanges?.(formValues);
      setErrors(createEmptyErrors());
      onClose();
      return;
    }

    const errors = validateInvoiceForm(formValues, mode);

    if (
      Object.keys(errors.fields).length > 0 ||
      Object.keys(errors.items).length > 0 ||
      errors.general.length > 0
    ) {
      setErrors(errors);
      return;
    }

    if (mode === "edit") {
      onSaveChanges?.(formValues);
      setErrors(createEmptyErrors());
      onClose();
      return;
    }

    onSaveAndSend?.({ ...formValues, status: "pending" });
    setErrors(createEmptyErrors());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 left-0 lg:left-23.5 max-lg:top-20">
      <button
        type="button"
        aria-label="Close form"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />

      <aside className="absolute left-0 top-0 h-full w-full max-w-xl md:max-w-2xl sm:rounded-tr-[20px] sm:rounded-br-[20px] overflow-y-auto bg-(--bg-page) px-6 pt-7 shadow-[0_24px_24px_rgba(0,0,0,0.18)] sm:px-10">
        <div className="pb-8">
          <div className="mb-10 flex items-center">
            <Typography variant="h2" as="h2">
              {mode === "edit" ? "Edit #" : "New Invoice"}
              {mode === "edit" && initialValues?.invoiceId ? (
                <span>{initialValues.invoiceId}</span>
              ) : null}
            </Typography>
          </div>

          <div className="space-y-8">
            <section>
              <Typography
                variant="h4"
                as="h3"
                className="text-brand sm:hidden"
              >
                Bill From
              </Typography>
              <Typography
                variant="h4"
                as="h3"
                className="text-(--accent-primary) max-sm:hidden"
              >
                Bill From
              </Typography>

              {mode === "edit" && initialValues?.status === "draft" ? (
                <div className="mt-4 flex items-center gap-3">
                  <input
                    id="move-from-draft"
                    type="checkbox"
                    className="h-4 w-4 accent-(--accent-primary)"
                    checked={formValues.status !== "draft"}
                    onChange={(event) => {
                      updateField(
                        "status",
                        event.target.checked ? "pending" : "draft"
                      );
                    }}
                  />
                  <label
                    htmlFor="move-from-draft"
                    className="text-[13px] leading-3.75 font-medium tracking-[-0.1px] text-(--text-secondary)"
                  >
                    Move to pending
                  </label>
                </div>
              ) : null}

              <div className="mt-6 space-y-6">
                <Input
                  label="Street Address"
                  value={formValues.senderStreet}
                  error={errors.fields.senderStreet}
                  onChange={(event) => {
                    updateField("senderStreet", event.target.value);
                  }}
                />

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      label="City"
                      value={formValues.senderCity}
                      className="capitalize"
                      error={errors.fields.senderCity}
                      onChange={(event) => {
                        updateField("senderCity", event.target.value);
                      }}
                    />
                    <Input
                      label="Post Code"
                      value={formValues.senderPostCode}
                      className="uppercase"
                      error={errors.fields.senderPostCode}
                      onChange={(event) => {
                        updateField("senderPostCode", event.target.value);
                      }}
                    />
                  </div>
                  <Input
                    label="Country"
                    value={formValues.senderCountry}
                    className="capitalize"
                    error={errors.fields.senderCountry}
                    onChange={(event) => {
                      updateField("senderCountry", event.target.value);
                    }}
                  />
                </div>
              </div>
            </section>

            <section>
              <Typography
                variant="h4"
                as="h3"
                className="text-brand sm:hidden"
              >
                Bill To
              </Typography>
              <Typography
                variant="h4"
                as="h3"
                className="text-(--accent-primary) max-sm:hidden"
              >
                Bill To
              </Typography>

              <div className="mt-6 space-y-6">
                <Input
                  label="Client's Name"
                  value={formValues.clientName}
                  error={errors.fields.clientName}
                  onChange={(event) => {
                    updateField("clientName", event.target.value);
                  }}
                />

                <Input
                  label="Client's Email"
                  type="email"
                  value={formValues.clientEmail}
                  error={errors.fields.clientEmail}
                  onChange={(event) => {
                    updateField("clientEmail", event.target.value);
                  }}
                />

                <Input
                  label="Street Address"
                  value={formValues.clientStreet}
                  error={errors.fields.clientStreet}
                  onChange={(event) => {
                    updateField("clientStreet", event.target.value);
                  }}
                />

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      label="City"
                      value={formValues.clientCity}
                      className="capitalize"
                      error={errors.fields.clientCity}
                      onChange={(event) => {
                        updateField("clientCity", event.target.value);
                      }}
                    />
                    <Input
                      label="Post Code"
                      value={formValues.clientPostCode}
                      className="uppercase"
                      error={errors.fields.clientPostCode}
                      onChange={(event) => {
                        updateField("clientPostCode", event.target.value);
                      }}
                    />
                  </div>
                  <Input
                    label="Country"
                    value={formValues.clientCountry}
                    className="capitalize"
                    error={errors.fields.clientCountry}
                    onChange={(event) => {
                      updateField("clientCountry", event.target.value);
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input
                    label="Invoice Date"
                    type="date"
                    value={formValues.invoiceDate}
                    placeholder="21 Aug 2021"
                    error={errors.fields.invoiceDate}
                    onChange={(event) => {
                      updateField("invoiceDate", event.target.value);
                    }}
                    disabled={mode !== "edit" && initialValues?.status === "paid"}
                  />

                  <div>
                    <label className="mb-2 block text-xs font-medium text-(--text-secondary)">
                      Payment Terms
                    </label>
                    <select
                      className="h-12 w-full rounded-md border border-(--border-default) bg-(--bg-surface) px-4 text-xs font-bold text-(--text-primary) outline-none focus:border-(--accent-primary)"
                      value={formValues.paymentTerms}
                      onChange={(event) => {
                        updateField("paymentTerms", Number(event.target.value));
                      }}
                      disabled={mode !== "edit" && initialValues?.status === "paid"}
                    >
                      {PAYMENT_TERMS.map((days) => (
                        <option key={days} value={days}>
                          Net {days} Day{days > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    {errors.fields.paymentTerms ? (
                      <p className="mt-2 text-[11px] font-semibold text-(--danger)">
                        {errors.fields.paymentTerms}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <Input
                    label="Project Description"
                    value={formValues.projectDescription}
                    placeholder="e.g. Graphic Design Service"
                    error={errors.fields.projectDescription}
                    onChange={(event) => {
                      updateField("projectDescription", event.target.value);
                    }}
                  />
                </div>
              </div>
            </section>

            <section>
              <Typography
                variant="h4"
                as="h3"
                className="text-(--text-primary)! text-[18px]! leading-8! font-bold! tracking-[-0.38px]!"
              >
                Item List
              </Typography>

              <div className="mt-6 space-y-4">
                <div className="hidden sm:block">
                  <div className="grid grid-cols-[minmax(0,1fr)_72px_96px_96px_32px] items-center gap-5 px-1">
                    <Typography
                      variant="bodyMuted"
                      as="p"
                      className="leading-3.75!"
                    >
                      Item Name
                    </Typography>
                    <Typography
                      variant="bodyMuted"
                      as="p"
                      className="leading-3.75! text-center"
                    >
                      Qty.
                    </Typography>
                    <Typography
                      variant="bodyMuted"
                      as="p"
                      className="leading-3.75! text-right"
                    >
                      Price
                    </Typography>
                    <Typography
                      variant="bodyMuted"
                      as="p"
                      className="leading-3.75! text-right"
                    >
                      Total
                    </Typography>
                    <span aria-hidden="true" />
                  </div>
                </div>

                {formValues.items.length > 0 && (
                  formValues.items.map((item) => {
                  const total = item.quantity * item.price;
                  const itemError = errors.items[item.id];

                  return (
                    <div key={item.id}>
                      <div className="space-y-6 sm:hidden">
                        <Input
                          label="Item Name"
                          value={item.name}
                          error={itemError ? itemError.name : undefined}
                          className={itemInputTextClass}
                          onChange={(event) => {
                            updateItem(item.id, { name: event.target.value });
                          }}
                        />

                        <div className="grid grid-cols-[72px_minmax(0,1fr)_auto_32px] items-end gap-4">
                          <Input
                            label="Qty."
                            type="number"
                            min={1}
                            value={String(item.quantity)}
                            error={itemError ? itemError.quantity : undefined}
                            className={`${itemInputTextClass} text-center`}
                            onChange={(event) => {
                              updateItem(item.id, {
                                quantity: Number(event.target.value || 0),
                              });
                            }}
                          />
                          <Input
                            label="Price"
                            type="number"
                            min={0}
                            step="0.01"
                            value={String(item.price)}
                            error={itemError ? itemError.price : undefined}
                            className={itemInputTextClass}
                            onChange={(event) => {
                              updateItem(item.id, {
                                price: Number(event.target.value || 0),
                              });
                            }}
                          />

                          <div>
                            <Typography variant="label" as="p" className="mb-2">
                              Total
                            </Typography>
                            <Typography
                              variant="h3"
                              as="p"
                              className="h-12 pt-3 text-(--text-secondary)!"
                            >
                              {formatMoney(total)}
                            </Typography>
                          </div>

                          <button
                            type="button"
                            className="flex h-12 items-center justify-center text-(--text-muted) hover:text-(--danger)"
                            onClick={() => {
                              removeItem(item.id);
                            }}
                            aria-label="Delete item"
                          >
                            <img src="/trash.svg" alt="" className="h-4 w-4 cursor-pointer" />
                          </button>
                        </div>
                      </div>

                      <div className="hidden sm:grid sm:grid-cols-[minmax(0,1fr)_72px_96px_96px_32px] sm:items-end sm:gap-5 sm:px-1">
                        <div>
                          <Input
                            aria-label="Item Name"
                            value={item.name}
                            error={itemError ? itemError.name : undefined}
                            className={itemInputTextClass}
                            onChange={(event) => {
                              updateItem(item.id, { name: event.target.value });
                            }}
                          />
                        </div>

                        <div>
                          <Input
                            aria-label="Quantity"
                            type="number"
                            min={1}
                            value={String(item.quantity)}
                            error={itemError ? itemError.quantity : undefined}
                            className={`${itemInputTextClass} text-center`}
                            onChange={(event) => {
                              updateItem(item.id, {
                                quantity: Number(event.target.value || 0),
                              });
                            }}
                          />
                        </div>

                        <div>
                          <Input
                            aria-label="Price"
                            type="number"
                            min={0}
                            step="0.01"
                            value={String(item.price)}
                            error={itemError ? itemError.price : undefined}
                            className={`${itemInputTextClass} text-right`}
                            onChange={(event) => {
                              updateItem(item.id, {
                                price: Number(event.target.value || 0),
                              });
                            }}
                          />
                        </div>

                        <div className="text-right">
                          <Typography
                            variant="h3"
                            as="p"
                            className={`h-12 pt-3 text-(--text-primary) ${itemInputTextClass}!`}
                          >
                            £ {formatMoney(total)}
                          </Typography>
                        </div>

                        <div className="flex h-12 items-center justify-center">
                          <button
                            type="button"
                            className="text-(--text-muted) hover:text-(--danger)"
                            onClick={() => {
                              removeItem(item.id);
                            }}
                            aria-label="Delete item"
                          >
                            <img src="/trash.svg" alt="" className="h-4 w-4 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }))}

                <Button variant="addItem" fullWidth onClick={addItem}>
                  + Add New Item
                </Button>

                {errors.general.map((error) => (
                  <Typography
                    key={error}
                    variant="caption"
                    as="p"
                    className="text-(--danger)!"
                  >
                    - {error}
                  </Typography>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between bg-(--bg-page) py-5.25 gap-1.75">
          <Button
            variant={mode === "edit" ? "edit" : "draft"}
            className="px-6 bg-[#F9FAFE]! text-[#7E88C3]! hover:bg-[#DFE3FA]!"
            onClick={onClose}
          >
            {mode === "edit" ? "Cancel" : "Discard"}
          </Button>

          <div className="flex items-center gap-1.75">
            {mode === "create" ? (
              <Button
                variant="draft"
                className="px-6 bg-[#373B53]! text-[#F9FAFE]! hover:bg-[#1E2139]!"
                onClick={submitAsDraft}
              >
                Save as Draft
              </Button>
            ) : null}

            <Button variant="primary" className="px-6" onClick={submitPrimary}>
              {mode === "edit" ? "Save Changes" : "Save & Send"}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
