import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FileViewer from 'react-file-viewer';
import { env } from '../../services';
import { paperStyles } from '../../styles/paper';
import './index.scss';

const onError = (e) => {
  console.log(e, 'error in file-viewer');
}

function CustomErrorComponent(props) {
  return (
    <div>Error</div>
  )
}
function FileLoader(props) {
  const { assets, handleDelete } = props;
  const classes = paperStyles();

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {assets.map((file, indx) => {
          return (
            <Grid item xs={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <FileViewer
                    fileType={file.type.split('/')[1]}
                    filePath={`${env}/${file.previewUrl}`}
                    errorComponent={CustomErrorComponent}
                    onError={onError}/>
                  <CardContent>
                    <Typography gutterBottom variant="subtitle2" component="p">
                      {file.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={()=> window.open(`${env}/${file.previewUrl}`, "_blank")}>
                    Download
                  </Button>
                  <Button size="small" color="primary" onClick={() => handleDelete('assets', [file.id])}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}

      </Grid>
    </React.Fragment>
  )
}

export default FileLoader;





//   {file.name}
//   <IconButton color="primary" aria-label="upload picture" component="span">
//     <PhotoCamera />
//   </IconButton>
//   <IconButton color="primary" aria-label="upload picture" component="span">
//     <PhotoCamera />
//   </IconButton>
//   <IconButton color="primary" aria-label="upload picture" component="span">
//     <PhotoCamera />
//   </IconButton>
