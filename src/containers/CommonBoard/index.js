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
import { AdminContext } from '../../contexts/AdminContext';
import { getColumnType } from './columns';
import { paperStylesTable } from '../../styles/paper';
import { getActions } from './actions';
import './index.scss';




function CommonBoard(props) {
  const classes = paperStylesTable();
  const { history, match } = props;
  const [showGrid, setShowGrid] = useState(true);
  const table = match.params.table;
  const columnData = getColumnType(table);
  const showCard = useMediaQuery('(max-width:1023px)');
  const getListView = (rows, actions, searchTerm) => {
    return (
      <Paper className={classes.paper}>
        <ListView history={history} actions={actions} rows={rows} columns={columnData} order_by="name" searchTerm={searchTerm}/>
      </Paper>
    )
  }

  const getCardView = ( rows, table, tables, actions, searchTerm ) => {
    return (
      <React.Fragment>
      {table === 'loads' ? <GroupByDateCard driverSelect={true} history={history} actions={actions} rows={rows} tables={tables} columns={columnData} table={table} searchTerm={searchTerm}/> :
      <CardView history={history} actions={actions} rows={rows} columns={columnData} table={table} searchTerm={searchTerm}/>}
      </React.Fragment>
    )
  }

  const handleLayout = () => {
    setShowGrid(!showGrid)
  }

  return (
      <AdminContext.Consumer>{(context) => {
        const { tableData, rows, filteredRecords, searchTerm } = context;
        const actions = getActions(table, history, context);
        const data = searchTerm.length ?  filteredRecords : rows
        return (
          <Grid container spacing={3}>
            <div className="viewOptions">
                <IconButton onClick={handleLayout}>
                  {!showCard ? !showGrid ? <AppsIcon/> : <TocIcon/> : ''}
                </IconButton>
            </div>
            <Grid item xs={12}>
                {showCard || (!showCard && showGrid) ? getCardView(data, table, tableData, actions, searchTerm) : getListView(data, actions, searchTerm)}
            </Grid>
          </Grid>

        )
      }}
      </AdminContext.Consumer>
  )
}


export default CommonBoard;
