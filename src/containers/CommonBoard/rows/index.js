import React from 'react';
import { Button } from '@material-ui/core';
import { getRowData } from './common';
import { getBrokerRowData } from './brokers';
import { getLoadRowData } from './loads';
import { getDriverRowData } from './driver';
import { getDispatchRowData } from './dispatch';
import { getInvoiceRowData } from './invoices';
import { getEquipmentRowData } from './equipment';


export const getUpdatedRows = (table, tables, actions) => {
  const rows = tables[table];
  const editButton = (id, actions) => (<Button color="primary" size="small" variant="contained" onClick={() => actions.handleClick(id)}>Details</Button>);
  const common = rows && rows.length ? getRowData(rows, actions, editButton) : [];
  const types = {
    brokers: () => getBrokerRowData(rows, actions, editButton, tables),
    loads: () => getLoadRowData(rows, actions, editButton, tables),
    driver: () => getDriverRowData(rows, actions, editButton, tables),
    dispatch: () => getDispatchRowData(rows, actions, editButton, tables),
    invoices: () => getInvoiceRowData(rows, actions, tables),
    tractor: () => getEquipmentRowData(rows, actions, editButton, tables),
    trailer: () => getEquipmentRowData(rows, actions, editButton, tables),
    equipment: () => getEquipmentRowData(rows, actions, editButton, tables),
    employees: () => getDriverRowData(rows, actions, editButton, tables)
  }
  return types[table] ? types[table]() : common;
}
