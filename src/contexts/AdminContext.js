import React, { Component, createContext } from 'react';
import { get, getType, getByID, save, deleteById, exportToCSV, uploadAssets } from '../services/';
import { getActions } from '../containers/CommonBoard/actions';
import { getUpdatedRows } from '../containers/CommonBoard/rows';

export const AdminContext = createContext();

class AdminContextProvider extends Component {
  constructor(props) {
    super()
    const { table, history } = props;
    const actions = getActions(table, history, {});
    this.state = {
      filteredRecords: [],
      searchTerm: '',
      record: {},
      openModal: false,
      deleteRecord: {},
      exportToCSV: [],
      tableData: {},
      table: table,
      driver: '',
      formatedData: [],
      history: history,
      actions,
      rows: [],
      requiredData: [ table, ...this.getRequiredData(table) ]
    }
    this.setFormatedData = this.setFormatedData.bind(this);
    this.getAllRecords = this.getAllRecords.bind(this);
    this.getAllRecordsByType = this.getAllRecordsByType.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.filterRecords = this.filterRecords.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.setDriver = this.setDriver.bind(this);
    this.getDriver = this.getDriver.bind(this);
    this.setRecords = this.setRecords.bind(this);
    this.getRecord = this.getRecord.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.exportRecordToCSV = this.exportRecordToCSV.bind(this);
    this.setTableData = this.setTableData.bind(this);
    this.setTable = this.setTable.bind(this);
    this.uploadAssets = this.uploadAssets.bind(this);
    this.results = {};
    this.dataMap = {}

  }

  componentDidMount() {
    this.getData(this.state.table)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.table !== this.props.table) {
      this.setState({
        table: nextProps.table,
        requiredData: [ nextProps.table, ...this.getRequiredData(nextProps.table) ]
      }, () => {
        console.log('getData getData');
        this.getData(nextProps.table)
      })
    }

    return nextState.rows !== this.state.rows
  }

  setFormatedData(data) {
    this.setState({
      formatedData: data
    })
  }

  getData(table) {
    const dataTables = [ table, ...this.getRequiredData(table) ];
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
      const actions = getActions(this.state.table, this.state.history, data);
      this.setState({
        tableData: data,
        actions,
        rows: [...getUpdatedRows(this.state.table, data, this.state.actions)]
      })
    }).catch(e => console.log('error:: ', e))

  }

  getRequiredData(table) {
    const tables = {
      loads: ['brokers', 'employees', 'equipment'],
      invoices: ['brokers']
    }

    return tables[table] || []
  }

  getAllRecords(table) {
    const getAllRecordsPromise = new Promise((resolve, reject) => {
      get(table).then(data => {
        resolve({[table]: data})
      });
    })

    return getAllRecordsPromise;
  }

  async getAllRecordsByType(table, type) {
    const response = await getType(table, type);

    return response;
  }

  async exportRecordToCSV(table, records) {
    const response = await exportToCSV(table, records);
    return response
  }

  async uploadAssets(table, records, id) {
    const response = await uploadAssets(table, records, id);
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

  getValueByID(record, field) {
    const fieldsWithRefs = ['driver'];
    let driverProfile = '';
    if(fieldsWithRefs.includes(field) && record[field]) {
      if(!this.results[record[field]]) {
          driverProfile = this.state.tableData['employees'].filter(rec => rec.id === record[field])[0];
          this.results = {
              ...this.results,
              [record[field]]: `${driverProfile.firstname} ${driverProfile.lastname}`
            }
        }
      }
      return this.results[record[field]] ? this.results[record[field]] : '';
    }


  filterRecords(table, fields, searchTerm) {
    if(fields.length) {
      const results = fields.map(field => {
        return this.state.tableData[table].filter(record => record[field] && (record[field].toLowerCase().includes(searchTerm.toLowerCase()) ||
          this.getValueByID(record, field).toLowerCase().includes(searchTerm.toLowerCase())));
      })

      const filteredRecords = [];
      const cacheIDs = [];

      results.map(result => {
        result.map(rec => {
          // avoid pushing rec twice
          if(!cacheIDs.includes(rec.id)) {
            filteredRecords.push(rec)
            cacheIDs.push(rec.id)
          }
          return rec
        })
        return result
      })
      this.setState({
        filteredRecords: filteredRecords,
        searchTerm
      })
    }
  }

  setRecord(table, record) {
    this.setState({
      record: {...record}
    })
  }

  setRecords(table, records, callback) {
    this.setState({
      [table]: {...records}
    })
  }

  async getRecord(table, id) {
    const response = await getByID(table, id);
    this.setState({
      record: {...response}
    });
    return response
  }

  addRecord(table, record) {
    this.setState({
      [table]: [...this.state[table], {...record}]
    });
  }

  setTableData(tableData) {
    this.setState({
      tableData
    });
  }
  setTable(table) {
    this.setState({
      table,
      [table]: [...this.state.tableData[table]]
    });
  }
  setDriver(driver) {
    this.setState({
      driver
    });
  }

  getDriver() {
    return this.state.driver
  }

  updateRecord(table, event) {
    const name = event.target.name;
    this.setState({
      record: {
        ...this.state.record,
        [name]: event.target.value}
    })
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
          setTableData: this.setTableData,
          uploadAssets: this.uploadAssets,
          setFormatedData: this.setFormatedData
        }
      }>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}

export default AdminContextProvider;
