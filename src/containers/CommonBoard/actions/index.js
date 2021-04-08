import { getInvoiceActions } from './invoice';
import { getLoadsActions } from './loads';
import { getCommonActions } from './common';

export const getActions = (table, history, tableData) => {
  const common = getCommonActions(table, history);
  const invoices = getInvoiceActions(table, history, tableData);
  const loads = getLoadsActions(table, history, tableData);

  const types = {
    invoices, loads
  }
  return types[table] ? {...common, ...types[table]} : common;
}
