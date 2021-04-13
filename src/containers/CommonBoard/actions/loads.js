import { generateInvoiceItems } from '../../../utils/generateInvoice'

export const getLoadsActions = (table, history, context) => {
  const { rows, saveRecord, filterRecords, deleteRecord, setDriver, getData, driver, tableData, getRecord } = context;
  const { brokers } = tableData;
  return {
      handleClick: (id) => {
        history.push(`${table}/${id}`);
      },
      handleBrokerClick: (e, loadId, brokerId) => {
        e.preventDefault();
        if(brokerId !== 'addNew'){
          history.push(`brokers/${brokerId}`);
        }else {
          history.push(`brokers/add/${table}/${loadId}`);
        }

      },
      handleChange: (e) => {
        e.preventDefault();
        setDriver('');
        filterRecords(e.target.value)
      },
      handleAdd: () => {
        history.push(`${table}/add`);
      },
      handleRefresh: false,
      handleDelete: (ids) => {
        deleteRecord(table, ids).then(data => {
          getData(table)
        });
      },
      handleExport: false,
      handleCreateInvoice: (selected, isClicked) => {
        const billed = selected.map(id => {
          const load = rows.filter(l => l.id === id)[0];
          const broker = brokers.filter(b => b.id === load.broker)[0];
          if(load && load.status === 'Completed' && load.broker !== 'addNew') {
            if(isClicked) {
              const invoiceItems = generateInvoiceItems(load, broker);
              if(invoiceItems.length) {
                invoiceItems.map(invoice => {
                  if (invoice) {
                    saveRecord('invoices', invoice).then(data => {
                      return data
                    });
                  }
                })
                // update load status
                getRecord(table, id).then(load => {
                  const updatedLoad = { ...load };
                  updatedLoad.status = "Billed";
                  saveRecord(table, updatedLoad).then(data => {
                    getData(table)
                  })
                })
              }
            }
            return true
          }else {
            return false
          }
        })

        return !billed.includes(false)
      },
      handleStatus: (id, status) => {
        return new Promise((resolve, reject) => {
          const record = {
            id, status
          }
          saveRecord(table, record).then(data => {
            getData(table)
          })
        })
      },
      filterByDriver: (driver) => {
        setDriver(driver);
        filterRecords(driver)
      },
      getDriver: () => driver,
      getDrivers: () => ''
    }
}
