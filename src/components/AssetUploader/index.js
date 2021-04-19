import React from 'react';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

function AssetUploader(props) {
  const { handleUpload } = props

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.currentTarget.userfiles.value)
    console.log(formData.getAll('file'));
    // const assets = files.map(f => f.meta)
    handleUpload(formData)
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="userfiles" />
      <button type="submit">Sumbit</button>
    </form>
  )
}

export default AssetUploader;
