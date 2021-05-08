import React, { Component, createContext } from 'react';
import { get, save, deleteById, exportToCSV, getByID, uploadAssets, getAssets } from '../services/';
import { getUpdatedRows } from '../containers/CommonBoard/rows';

export const AdminContext = createContext();

const getRequiredData = (table) => {
  const tables = {
    loads: ['brokers', 'employees', 'equipment'],
    invoices: ['brokers']
  }

  return tables[table] || []
}

class AdminContextProvider extends Component {
  constructor(props) {
    super()
    const { table, history } = props;
    this.state = {
      record: {},
      filteredRecords: [],
      searchTerm: '',
      deleteRecord: {},
      exportToCSV: [],
      tableData: {},
      table: table,
      driver: '',
      history: history,
      rows: [],
      requiredData: [ table, ...getRequiredData(table) ],
      assets: []
    }
    this.getData = this.getData.bind(this);
    this.getRecord = this.getRecord.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.getAllRecords = this.getAllRecords.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.filterRecords = this.filterRecords.bind(this);
    this.setDriver = this.setDriver.bind(this);
    this.setTable = this.setTable.bind(this);
    this.getDriver = this.getDriver.bind(this);
    this.exportRecordToCSV = this.exportRecordToCSV.bind(this);
    this.upload = this.upload.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
    this.getAssetsFor = this.getAssetsFor.bind(this);
  }

  // componentDidMount() {
  //   this.getData(this.state.table).then(response => {
  //     console.log('getData(table):: ', response);
  //   })
  // }

  getData(table, setRows) {
    const getDataPromise = new Promise((resolve, reject) => {
      const dataTables = [ table, ...getRequiredData(table) ];
      if(dataTables)
      Promise.all(dataTables.map(async (tbl) => {
        return this.getAllRecords(tbl);
      })).then(d => {
        const data = d.reduce((model, m) => {
          model = {
            ...model,
            ...m
          }
          return model
        }, {})
        const rows = setRows ? getUpdatedRows(table, data) : this.state.rows;
        this.setState({
          tableData: {...this.state.tableData, ...data},
          rows,
          table
        }, () => {
          resolve(true)
        })
      }).catch(e => {
        console.log('error:: ', e)
        reject(e)
      })
    })
    this.setState({
      filteredRecords: [],
      // rows: setRows ? [] : this.state.rows,
      driver: '',
      searchTerm: '',
      requiredData: [ table, ...getRequiredData(table) ]
    })
    return getDataPromise
  }

  getAllRecords(table) {
    const getAllRecordsPromise = new Promise((resolve, reject) => {
      get(table).then(data => {
        resolve({[table]: data})
      });
    })
    return getAllRecordsPromise;
  }

  getRecord(table, id) {
    const getByIDPromise = new Promise((resolve, reject) => {
      getByID(table, id).then(data => {
        this.setState({
          record: data
        })
        resolve(data)
      });
    })

    return getByIDPromise;
  }

  setRecord(record) {
    this.setState({
      record
    });
  }

  async exportRecordToCSV(table, records) {
    const response = await exportToCSV(table, records);
    return response
  }


  async saveRecord(table, record) {
    const response = await save(table, record);
    this.setState({
      record
    })
    return response
  }

  async deleteRecord(table, ids) {
    await ids.map(id => {
      const response = deleteById(table, id);
      this.setState({
        deleteRecord: {...response}
      }, () => {
        this.getAllRecords(table)
      });
      return response;
    })
  }


  filterRecords(searchTerm) {
    const fields = Object.keys(this.state.rows[0]);
    const filteredRecords = [];
    const cacheIDs = [];
    if(fields.length) {
      fields.map(field => {
        return this.state.rows.filter(record => {
          if(!cacheIDs.includes(record.id) && record[field] && record[field].length && (record[field].toLowerCase().includes(searchTerm.toLowerCase()))) {
            cacheIDs.push(record.id)
            filteredRecords.push(record)
          }
          return true
        });
      })
      this.setState({
        filteredRecords,
        searchTerm
      })
    }
  }
  setDriver(driver) {
    this.setState({
      driver
    });
  }

  getDriver() {
    return this.state.driver
  }

  setTable(table) {
    this.setState({
      table
    });
  }

  upload(asset, table, id) {
    uploadAssets(asset, table, id).then(data => {
      this.setState({
        assets: [...data]
      })
    })
  }

  async deleteAsset(table, id, recordId) {
    const response = await deleteById('assets', id);
    this.setState({
      deleteRecord: {...response}
    }, () => {
      this.getAssetsFor(table, recordId)
    });
    return response;
  }

  getAssetsFor(table, id) {
    const getAssetsForPromise = new Promise((resolve, reject) => {
      getAssets(table, id).then(data => {
        this.setState({
          assets: [...data]
        }, () => {
          console.log('updated assets!!');
        })
        resolve(data)
      })
    })


    return getAssetsForPromise
  }

  render() {
    return (
      <AdminContext.Provider
        value={{...this.state,
          addRecord: this.addRecord,
          filterRecords: this.filterRecords,
          getRecord: this.getRecord,
          setRecord: this.setRecord,
          getAllRecordsByType: this.getAllRecordsByType,
          saveRecord: this.saveRecord,
          deleteRecord: this.deleteRecord,
          updateRecord: this.updateRecord,
          getAllRecords: this.getAllRecords,
          setDriver: this.setDriver,
          setTable: this.setTable,
          getDriver: this.getDriver,
          exportRecordToCSV: this.exportRecordToCSV,
          getData: this.getData,
          upload: this.upload,
          deleteAsset: this.deleteAsset,
          getAssetsFor: this.getAssetsFor
        }
      }>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}

export default AdminContextProvider;
