import { generateInvoiceItems } from '../../../utils/generateInvoice'
import { filterRecords } from '../../../utils/filterTables'

export const getLoadsActions = (context, table, history, filterFields) => {
  const { deleteRecord, filterRecords, setTableData, tableData, saveRecord, getRecord, getAllRecords, setDriver, driver } = context;
  const { loads, brokers } = tableData;
  const store = table;
  const refreshData = (store) => {
    getAllRecords(store).then(data => {
      setTableData(store, data);
      return data
    });
  }
  return {
      handleClick: (id) => {
        history.push(`${store}/${id}`);
      },
      handleBrokerClick: (e, loadId, brokerId) => {
        e.preventDefault();
        if(brokerId !== 'addNew'){
          history.push(`brokers/${brokerId}`);
        }else {
          history.push(`brokers/add/${store}/${loadId}`);
        }

      },
      handleChange: (e) => {
        e.preventDefault();
        const fields = filterFields;
        setDriver('');
        filterRecords(store, fields, e.target.value)
      },
      handleAdd: () => {
        history.push(`${store}/add`);
      },
      handleRefresh: false,
      handleDelete: (ids) => {
        deleteRecord(table, ids).then(data => {
          refreshData(store);
        });
      },
      handleExport: false,
      handleCreateInvoice: (selected, isClicked) => {
        const billed = selected.map(id => {
          const load = loads.filter(l => l.id === id)[0];
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
                getRecord(store, id).then(load => {
                  const updatedLoad = { ...load };
                  updatedLoad.status = "Billed";
                  saveRecord(store, updatedLoad).then(data => {
                    refreshData(store);
                    return data
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
          saveRecord(table, record).then( data => {
            refreshData(store);
            resolve(data);
          })
        })
      },
      filterByDriver: (driver) => {
        const fields = filterFields;
        setDriver(driver);
        filterRecords(store, fields, driver)
      },
      getDriver: () => driver,
      getDrivers: () => tableData.driver
    }
}
