import type { Invoice, StatusInvoice } from '@prisma/client'

import type { FindGenericList } from './commons'

export type InvoiceFields = keyof Invoice
export type FindInvoicesList = FindGenericList<InvoiceFields> & {
  status?: StatusInvoice
}

export type InvoiceWithCounts = Invoice
