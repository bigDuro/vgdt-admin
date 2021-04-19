import React from 'react';
import Grid from '@material-ui/core/Grid';
import FileViewer from 'react-file-viewer';
import { env } from '../../services';


const onError = (e) => {
  console.log(e, 'error in file-viewer');
}

function CustomErrorComponent(props) {
  return (
    <div>Error</div>
  )
}
function FileLoader(props) {
  const { assets } = props;

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {assets.map((file, indx) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} key={indx}>
              <FileViewer
                fileType={file.type.split('/')[1]}
                filePath={`${env}/${file.previewUrl}`}
                errorComponent={CustomErrorComponent}
                onError={onError}/>
            </Grid>
          )
        })}

      </Grid>
    </React.Fragment>
  )
}

export default FileLoader;
