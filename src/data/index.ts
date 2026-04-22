import invoiceSeed from "./data.json";

export type InvoiceStatus = "draft" | "pending" | "paid";

export interface StoredInvoiceItem {
	name: string;
	qty: number;
	price: number;
	total: number;
}

export interface StoredInvoice {
	id: string;
	status: InvoiceStatus;
	description: string;
	dueDate: string;
	invoiceDate: string;
	paymentDue: string;
	clientName: string;
	sentTo: string;
	billFrom: {
		street: string;
		city: string;
		postCode: string;
		country: string;
	};
	billTo: {
		name: string;
		street: string;
		city: string;
		postCode: string;
		country: string;
	};
	items: StoredInvoiceItem[];
	total: number;
}

const STORAGE_KEY = "invoice-hng-data";
type StoredInvoiceInput = Omit<StoredInvoice, "billFrom"> & {
	billFrom?: StoredInvoice["billFrom"];
};

const seedInvoices = invoiceSeed as StoredInvoiceInput[];

const DEFAULT_BILL_FROM: StoredInvoice["billFrom"] = {
	street: "19 Union Terrace",
	city: "London",
	postCode: "E1 3EZ",
	country: "United Kingdom",
};

const normalizeInvoice = (invoice: StoredInvoiceInput): StoredInvoice => ({
	...invoice,
	billFrom: invoice.billFrom ?? DEFAULT_BILL_FROM,
});

const isBrowser = () => typeof window !== "undefined";

const safeParseInvoices = (raw: string | null): StoredInvoice[] | null => {
	if (!raw) {
		return null;
	}

	try {
		const parsed = JSON.parse(raw) as StoredInvoice[];
		if (!Array.isArray(parsed)) {
			return null;
		}

		return parsed;
	} catch {
		return null;
	}
};

export const loadInvoicesFromStorage = (): StoredInvoice[] => {
	if (!isBrowser()) {
		return seedInvoices.map(normalizeInvoice);
	}

	const stored = safeParseInvoices(localStorage.getItem(STORAGE_KEY));

	if (stored) {
		return (stored as StoredInvoiceInput[]).map(normalizeInvoice);
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(seedInvoices));
	return seedInvoices.map(normalizeInvoice);
};

export const persistInvoices = (invoices: StoredInvoice[]) => {
	if (!isBrowser()) {
		return invoices;
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
	return invoices;
};

export default seedInvoices;