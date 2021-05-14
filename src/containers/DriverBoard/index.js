import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GroupByDateCard from '../../components/GroupByDateCard';
import { getActions } from './actions';
import { getUpdatedRows } from './rows';
import { paperStylesTable } from '../../styles/paper';
import { get, getLoadsByKeyValue, getByID, getRecordsByIds, save, getAssets } from '../../services';
import './index.scss';




function DriverBoard(props) {
  const classes = paperStylesTable();
  const { history, match } = props;
  const [tables, setTables] = useState({});
  const [rows, setRows] = useState([]);
  const [driverId, setDriverId] = useState('');
  const driver = match.params.driver;
  const actions = getActions(history, driver);
  const getData = (id, employees) => {
    const loadsResponse = getLoadsByKeyValue('driver', id).then(loads => {
      const brokerIds = loads.reverse().map(load => {
        return load.broker
      })
      const brokerResponse = getRecordsByIds('brokers', brokerIds).then(brokers => {
        const tempData = {
          'employees': employees,
          'brokers': brokers,
          'loads': loads
        }
        setTables(tempData);
        setRows(getUpdatedRows('loads', tempData));
      });
    })
  }

  React.useEffect(() => {
    const makeRequest = async () => {
      const employeeResponse = get('employees').then(employees => {
        // setTables({
        //   ...tables,
        //   'employees': employees
        // });
        const theDriver = employees.filter(data => {
          return `${data.firstname} ${data.lastname}` === driver
        })
        if(theDriver && theDriver.length){
          setDriverId(theDriver[0].id);
          getData(theDriver[0].id, employees)
        }
      });


    }
    makeRequest();
  }, []);


  actions.handleStatus = (id, status) => {
    return new Promise((resolve, reject) => {
      const record = {
        id, status
      }
      save('loads', record).then(data => {
        getData(driverId, tables.employees)
      })
    })
  }


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {rows && rows.length ? <GroupByDateCard driverSelect={false} history={history} actions={actions} rows={rows} tables={tables} searchTerm={''}/> : ''}
      </Grid>
    </Grid>
  )
}


export default DriverBoard;
