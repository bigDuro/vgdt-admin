import { getInvoiceActions } from './invoice';
import { getLoadsActions } from './loads';
import { getCommonActions } from './common';

export const getActions = (table, history, context) => {
  const common = getCommonActions(table, history, context);
  const invoices = getInvoiceActions(table, history, context);
  const loads = getLoadsActions(table, history, context);

  const types = {
    invoices, loads
  }
  return types[table] ? {...common, ...types[table]} : common;
}
