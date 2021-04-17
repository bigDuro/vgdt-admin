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


export const getInvoiceActions = (table, history, context) => {
  const { saveRecord, getData, exportRecordToCSV, tableData, deleteRecord, getRecord } = context;
  return {
    handleClick: false,
    handleLoadClick: (e, id) => {
      e.preventDefault();
      getData('loads', false).then(response => {
        console.log('got Loads data');
        getRecord('loads', id).then(data => {
          history.push(`loads/${id}`);
          return true
        })
      })
    },
    handleBrokerClick: (e, id) => {
      e.preventDefault();
      getRecord('brokers', id).then(data => {
        history.push(`brokers/${id}`);
        return true
      })

    },
    handleAdd: false,
    handleDelete: (ids) => {
      const idsToDelete = getInvoiceItemsWithIds(ids, tableData[table]);
      deleteRecord(table, idsToDelete).then(data => {
        getData(table, true);
      });
    },
    handleExport: (ids) => {
      const idsToExport = getInvoiceItemsWithIds(ids, tableData[table]);
      const recordsToExport = tableData[table].filter(record => {
        return idsToExport.includes(record.id);
      }).reverse()

      exportRecordToCSV(table, recordsToExport).then(data => {
        ids.map(id => {
          const record = {
            id,
            billed: "1"
          };
          saveRecord(table, record).then( data => {
            getData(table, true);
            return data
          })
          return false
        })

        console.log(data);
      }).catch(e => {
        console.log(e);
      })
    }
  }
}
