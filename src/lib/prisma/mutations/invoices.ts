import * as validators from '@/validators'

import { prisma } from '..'

export const createInvoiceQuery = ({
  amount,
  dueDate,
  storeId,
  description,
}: validators.CreateInvoiceSchemaType) => {
  return prisma.invoice.create({
    data: {
      amount,
      dueDate,
      storeId,
      description,
    },
  })
}
