import React from 'react';
import Form from '@rjsf/material-ui';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AssetManager from '../../containers/AssetManager/';
import { AdminContext } from '../../contexts/AdminContext';
import { paperStyles } from '../../styles/paper';
import { getSchemaType } from  './Schemas/';
import { getActions } from './actions/'
import { formatData } from '../../utils/formatData';
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
        const formattedData = formatData(table, record);
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
                {formattedData.id ? <Form
                  schema={schema.JSONSchema}
                  uiSchema={schema.UISchema}
                  formData={formattedData}
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
                    <AssetManager {...props}/>
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
