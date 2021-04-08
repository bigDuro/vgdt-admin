import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import TocIcon from '@material-ui/icons/Toc';
import ListView from '../../components/ListView';
import CardView from '../../components/CardView';
import GroupByDateCard from '../../components/GroupByDateCard';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { getColumnType } from './columns';
import { paperStylesTable } from '../../styles/paper';
import './index.scss';




function CommonBoard(props) {
  const classes = paperStylesTable();
  const { history, match } = props;
  const [showGrid, setShowGrid] = useState(true);
  const table = match.params.table;
  const columnData = getColumnType(table);
  const showCard = useMediaQuery('(max-width:1023px)');
  const getListView = (rows, actions) => {
    return (
      <Paper className={classes.paper}>
        <ListView history={history} actions={actions} rows={rows} columns={columnData} order_by="name"/>
      </Paper>
    )
  }

  const getCardView = ( rows, table, tables, actions ) => {
    return (
      <React.Fragment>
      {table === 'loads' ? <GroupByDateCard history={history} actions={actions} rows={rows} tables={tables} columns={columnData} table={table}/> :
      <CardView history={history} actions={actions} rows={rows} columns={columnData} table={table}/>}
      </React.Fragment>
    )
  }

  const handleLayout = () => {
    setShowGrid(!showGrid)
  }

  return (
    <AdminContextProvider table={table} history={history}>
      <AdminContext.Consumer>{(context) => {
        const { tableData, actions, rows } = context;
        // const actions = getActions(context, table, history, tableData);
        // const rows = tableData[table] && tableData[table].length ? tableData[table] : [];

        return (
          <Grid container spacing={3}>
            <div className="viewOptions">
                <IconButton onClick={handleLayout}>
                  {!showCard ? !showGrid ? <AppsIcon/> : <TocIcon/> : ''}
                </IconButton>
            </div>
            <Grid item xs={12}>
                {showCard || (!showCard && showGrid) ? getCardView(rows, table, tableData, actions) : getListView(rows, actions)}
            </Grid>
          </Grid>

        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default CommonBoard;
