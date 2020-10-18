import React from 'react';

const getInvoiceItemsWithIds = (ids, records) => {

  const idsToDelete = [];
  const invoiceId = [];
  ids.map(id => {
    records.filter(record => {
      if(record.id === id) {
        invoiceId.push(record['*InvoiceNo'])
      }
    return record
    })
  return id
  })
  invoiceId.map(id => {
    records.map(record => {
      if(record['*InvoiceNo'] === id) {
        idsToDelete.push(record.id)
      }
      return record
    })
    return id
  })

  return idsToDelete;
}


export const getInvoiceActions = (context, table, history, filterFields) => {
  const { tableData, deleteRecord, getAllRecords, exportRecordToCSV, filterRecords, setTableData} = context;
  const refreshData = (store) => {
    getAllRecords(store).then(data => {
      setTableData(store, data);
      return data
    });
  }
  return {
    handleClick: (e, id) => {
      e.preventDefault();
      history.push(`loads/${id}`);
    },
    handleAdd: false,
    handleDelete: (ids) => {
      const idsToDelete = getInvoiceItemsWithIds(ids, tableData[table]);
      deleteRecord(table, idsToDelete).then(data => {
        refreshData(table)
      });
    },
    handleChange: (e) => {
      e.preventDefault();
      const fields = filterFields;
      filterRecords(table, fields, e.target.value)
    },
    handleExport: (ids) => {
      const idsToExport = getInvoiceItemsWithIds(ids, tableData[table]);
      const recordsToExport = tableData[table].filter(record => {
        return idsToExport.includes(record.id);
      }).reverse()

      exportRecordToCSV(table, recordsToExport).then(data => {
        console.log(data);
      }).catch(e => {
        console.log(e);
      })
    }
  }
}