import React from 'react';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

function FileUploader(props) {
  const { handleUpload } = props
  const [files, setFiles] = React.useState([]);
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

  // const getUploadParams = ({ file, meta }) => {
  //   const formData = new FormData()
  //   formData.append(
  //       "myFile",
  //       file,
  //       meta
  //     )
  //   console.log(file, meta);
  //   return { url: 'http://localhost:8888/public/api/assets', formData }
  // }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if(status === 'uploading') {
      console.log('upload:: ', status, file)
      handleUpload(file);
      // setFiles([...files, file])
    }else if (status === 'removed') {
      console.log('upload:: ', status, file)
    }

  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => {
    // const assets = files.map(f => f.meta)
    // handleUpload(files)
  }


  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,application/pdf"
    />
  )
}

export default FileUploader;
