import React, { Component, createContext, useState, useEffect } from 'react';
import { get, getType, getByID, save, deleteById, exportToCSV, uploadAssets } from '../services/';

export const AdminContext = createContext();

class AdminContextProvider extends Component {
  constructor(props) {
    super()
    const { table } = props;
    this.state = {
      filteredRecords: [],
      searchTerm: '',
      record: {},
      openModal: false,
      deleteRecord: {},
      exportToCSV: [],
      tableData: {},
      table: table,
      driver: ''
    }
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
    if(nextProps.table !== this.props.table){
      this.setState({
        table: nextProps.table
      }, () => {
        this.getData(this.state.table);
      })

    }

    return nextProps.table === this.props.table
  }

  getData(table) {
    const requiredData = this.getRequiredData(table);
    const dataTables = [ table, ...requiredData ];

    if(dataTables)
    dataTables.map(async (tbl) => {
      this.getAllRecords(tbl);
    })
  }

  getRequiredData(table) {
    const tables = {
      loads: ['brokers', 'employees', 'equipment'],
      invoices: ['brokers']
    }

    return tables[table] || []
  }

  async getAllRecords(table) {
    const response = await get(table);
    this.setState({
      tableData: {
        ...this.state.tableData,
        [table]: [...response]
      }
    }, () => {
      console.log('getAllRecords:: ', this.state.tableData);
    })
    return response;
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
    const fieldsWithRefs = ['employees'];
    let driverProfile = '';
    if(fieldsWithRefs.includes(field) && record[field]) {
      if(!this.results[record[field]]) {
          driverProfile = this.state.tableData[field].filter(rec => rec.id === record[field])[0];
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
          uploadAssets: this.uploadAssets
        }
      }>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}

export default AdminContextProvider;
