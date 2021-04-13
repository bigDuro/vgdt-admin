import React, { Component, createContext } from 'react';
import { get, save, deleteById, exportToCSV, getByID } from '../services/';
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
      filteredRecords: [],
      searchTerm: '',
      deleteRecord: {},
      exportToCSV: [],
      tableData: {},
      table: table,
      driver: '',
      history: history,
      rows: [],
      requiredData: [ table, ...getRequiredData(table) ]
    }
    this.getData = this.getData.bind(this);
    this.getRecord = this.getRecord.bind(this);
    this.getAllRecords = this.getAllRecords.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.filterRecords = this.filterRecords.bind(this);
    this.setDriver = this.setDriver.bind(this);
    this.getDriver = this.getDriver.bind(this);
    this.exportRecordToCSV = this.exportRecordToCSV.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.table)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.table !== this.props.table) {
      this.setState({
        table: nextProps.table,
        filteredRecords: [],
        driver: '',
        searchTerm: '',
        requiredData: [ nextProps.table, ...getRequiredData(nextProps.table) ]
      }, () => {
        console.log('getData getData');
        this.getData(nextProps.table)
      })
    }

    return nextState.rows !== this.state.rows || this.state.searchTerm !== nextState.searchTerm
  }

  getData(table) {
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
      const rows = getUpdatedRows(this.state.table, data);
      this.setState({
        tableData: data,
        rows
      })
    }).catch(e => console.log('error:: ', e))

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
        resolve(data)
      });
    })

    return getByIDPromise;
  }

  async exportRecordToCSV(table, records) {
    const response = await exportToCSV(table, records);
    return response
  }


  async saveRecord(table, record) {
    const response = await save(table, record);
    this.setState({
      record: {...record}
    })
    return response
  }

  async deleteRecord(table, ids) {
    await ids.map(id => {
      const response = deleteById(table, id);
      this.setState({
        deleteRecord: {...response}
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

  render() {
    return (
      <AdminContext.Provider
        value={{...this.state,
          addRecord: this.addRecord,
          filterRecords: this.filterRecords,
          getRecord: this.getRecord,
          getAllRecordsByType: this.getAllRecordsByType,
          saveRecord: this.saveRecord,
          deleteRecord: this.deleteRecord,
          updateRecord: this.updateRecord,
          getAllRecords: this.getAllRecords,
          setRecord: this.setRecord,
          setDriver: this.setDriver,
          getDriver: this.getDriver,
          setRecords: this.setRecords,
          exportRecordToCSV: this.exportRecordToCSV,
          getData: this.getData
        }
      }>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}

export default AdminContextProvider;
