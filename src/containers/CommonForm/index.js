import React from 'react';
import Form from '@rjsf/material-ui';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FileUploader from '../../components/FileUploader/';
import FileLoader from '../../components/FileLoader';
import { AdminContext } from '../../contexts/AdminContext';
import { paperStyles } from '../../styles/paper';
import { getSchemaType } from  './Schemas/';
import { getActions } from './actions/'
import './index.scss';



function CommonForm(props) {
  const classes = paperStyles();
  const { history, match } = props;
  const [ formData, setFormData ] = React.useState([])
  const table = match.params.table;
  const recordId = match.params.id
  const updateTable = match.params.updateTable
  const recordIdToUpdate = match.params.recordIdToUpdate;
  const [disabled, setdisabled] = React.useState(false);

  return (
      <AdminContext.Consumer>{(context) => {
        const { record, tableData, upload, assets} = context;
        const actions = getActions(context, table, history);
        const schema = getSchemaType(table, tableData);
        const handleLockToggle = (e) => {
          e.preventDefault();
          setdisabled(!disabled);
        }

        const handleBack = (e) => {
          e.preventDefault();
          history.goBack()
        }

        const handleSave = (formData) => {
          actions.handleSave(formData, updateTable, recordIdToUpdate);
        }

        if(!record.id){
          history.goBack();
        }
        console.log('record:: ', record);

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <div className="common_Form">
                <div className="common_Form_Toolbar">
                  {actions && actions.hasToggle ?
                    <Button color="primary" onClick={handleLockToggle}>
                      {disabled ?
                        <LockIcon/> :
                        <LockOpenIcon/>
                      }
                    </Button> :
                  ''}
                  <Button color="primary" onClick={handleBack}>
                    <ArrowBackIcon/>
                  </Button>
                </div>
                {recordId ? <Form
                  schema={schema.JSONSchema}
                  uiSchema={schema.UISchema}
                  formData={record}
                  onSubmit={(data) => handleSave(data.formData)}
                  disabled={disabled}
                  onChange={(data) => actions.handleChange(data.formData)}>
                </Form> : 'No Form Data'}
              </div>
              </Paper>
              {
                recordId ?
                <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FileUploader handleUpload={upload} table={table} id={recordId}/>
                    <FileLoader assets={assets}/>
                  </Grid>
                </Grid>
                </React.Fragment> : ''
              }
            </Grid>
          </Grid>
        )
      }}
      </AdminContext.Consumer>
  )
}

export default CommonForm;
