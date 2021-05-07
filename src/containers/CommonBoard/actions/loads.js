import { generateInvoiceItems } from '../../../utils/generateInvoice'
import { getFormData } from  '../../CommonForm/Schemas/';

export const getLoadsActions = (table, history, context) => {
  const { rows, saveRecord, filterRecords, setDriver, getData, driver, tableData, getRecord, setRecord, getAssetsFor } = context;
  const { brokers, equipment } = tableData;
  return {
      handleBrokerClick: (e, loadId, brokerId) => {
        e.preventDefault();
        if(brokerId !== 'addNew'){
          getRecord('brokers', brokerId).then(data => {
            history.push(`brokers/${brokerId}`);
            return true
          })

        }else {
          const data = getFormData('brokers');
          const record = data.formData;
          // setRecord(false);
          saveRecord('brokers', record).then(data => {
            const id = data.id;
            // getData(table, true).then(response => {
              getRecord('brokers', id).then(data => {
                filterRecords(id)
                getAssetsFor('brokers', id)
                  history.push(`brokers/add/${table}/${loadId}`);
                return true
              })
            // })
          })

        }
        filterRecords(loadId)
      },
      handleChange: (e) => {
        e.preventDefault();
        setDriver('');
        filterRecords(e.target.value)
      },
      handleExport: false,
      handleCreateInvoice: (selected, isClicked) => {
        const billed = selected.map(id => {
          const load = rows.filter(l => l.id === id)[0];
          const broker = brokers.filter(b => b.id === load.broker)[0];
          if(load && load.status === 'Completed' && load.broker !== 'addNew') {
            if(isClicked) {
              const invoiceItems = generateInvoiceItems(load, broker, equipment);
              if(invoiceItems.length) {
                invoiceItems.map(invoice => {
                  if (invoice) {
                    saveRecord('invoices', invoice).then(data => {
                      return data
                    });
                  }
                  return false
                })
                // update load status
                getRecord(table, id).then(load => {
                  const updatedLoad = { ...load };
                  updatedLoad.status = "Billed";
                  saveRecord(table, updatedLoad).then(data => {
                    getData(table, true)
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
            getData(table, true)
          })
        })
      },
      filterByDriver: (driver) => {
        setDriver(driver);
        filterRecords(driver)
      },
      getDriver: () => driver,
      getDrivers: () => '',
      handleClear: () => {
        filterRecords('');
        setDriver('');
      }
    }
}
