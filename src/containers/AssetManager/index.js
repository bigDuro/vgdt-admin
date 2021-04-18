import React, { useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FileUploader from '../../components/FileUploader/';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
// import './index.scss';

function AssetManager(props) {
  const { history, match } = props;
  const id = match.params.id;
  const handleBackClick = () => {
    history.goBack();
  }
  return (
      <AdminContext.Consumer>{(context) => {
        const { upload } = context;
        return (
          <div className="AssetManager">
            <div className="AssetManager_Back" onClick={handleBackClick}>
              <ArrowBackIcon/>
            </div>
            <FileUploader handleUpload={upload}/>
          </div>
        )
      }}
      </AdminContext.Consumer>
  )
}

export default AssetManager;
