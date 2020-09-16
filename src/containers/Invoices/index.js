import React from 'react';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { AdminContext } from '../../contexts/AdminContext';
import ListTable from '../../components/ListTable';
import ListToolBar from '../../components/ListToolBar';
import { invoiceColumns } from '../../constants/invoiceColumns';
import { INVOICE_MODEL } from '../../constants';

const getRows = (rows) => {
  const ids = {};
  const editButton = (id) => (
      <Button color="primary" onClick={() => actions.handleClick(id)}>Details</Button>
  );
  const mappedInvoiceNo = rows.reduce((map, row) => {
    map[row['*InvoiceNo']] = map[row['*InvoiceNo']] ? [...map[row['*InvoiceNo']], row] : [row];
    return map
  },{});

  const newRow = Object.keys(mappedInvoiceNo).map(id => {
    const productServices = [];
    mappedInvoiceNo[id].map((row, idx) => {
       productServices.push(mappedInvoiceNo[id][idx].ProductService)
    })
    mappedInvoiceNo[id][0].ProductService = productServices.join(', ')
    return mappedInvoiceNo[id][0]
  })

  const updateRowData = newRow.map(row => {
    const newRow = {...row};
    newRow.edit = editButton(row.id);
    newRow.ServiceDate = new Date(row.ServiceDate).toLocaleString();
    return newRow;
  })

  return updateRowData;
}
function Invoices(props) {
  const table = 'invoices';
  const { history } = props;
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const {records, filteredRecords, searchTerm, filterRecords, getAllRecords, deleteRecord, saveRecord } = context;
        const rows = searchTerm ? filteredRecords : [...records];
        const updateRowData = rows.length ? getRows(rows) : [];
        const getInvoiceItemsWithIds = (ids) => {
          const idsToDelete = [];
          const invoiceId = [];
          ids.map(id => {
            records.map(record => {
              if(record.id === id) {
                invoiceId.push(record['*InvoiceNo'])
              }
            })
          })
          invoiceId.map(id => {
            records.map(record => {
              if(record['*InvoiceNo'] === id) {
                idsToDelete.push(record.id)
              }
            })
          })
          return idsToDelete
        }
        if(!rows.length){
          getAllRecords(table).then(data => {
            return data
          });
        }

        const actions = {
          handleClick: (id) => {
            history.push(`/vgdt-admin/${table}/${id}`);
          },
          handleChange: (e) => {
            const fields = ['*Customer', '*InvoiceNo'];
            filterRecords(fields, e.target.value)
          },
          handleAdd: false,
          handleDelete: (ids) => {
            const idsToDelete = getInvoiceItemsWithIds(ids);
            deleteRecord(table, idsToDelete);
          }
        }


        return (
          <ListView history={history} actions={actions} rows={updateRowData} columns={invoiceColumns}/>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default Invoices;
