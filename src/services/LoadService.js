export const getLoads = () => {
  const getLoadsPromise = new Promise((resolve, reject) => {
    fetch('http://localhost:8888/public/loads')
      .then(response => response.json())
      .then(loadData => {
        resolve(loadData)
      }).catch(err => {
        console.log(err);
      })
  })
  return getLoadsPromise;
}


export const getLoadByID = (id) => {
  const getLoadByIDPromise = new Promise((resolve, reject) => {
    fetch('http://localhost:8888/public/loads/id/' + id)
      .then(response => response.json())
      .then(loadData => {
        resolve(loadData)
      }).catch(err => {
        console.log(err);
      })
  })
  return getLoadByIDPromise;
}

export const saveLoad = (load) => {
  console.log('saveLoad: ', load);
  const getLoadByIDPromise = new Promise((resolve, reject) => {
    fetch('http://localhost:8888/public/loads', {
      method: 'post',
      body: JSON.stringify(load)
    })
      .then(response => response.json())
      .then(loadData => {
        resolve(loadData)
      }).catch(err => {
        console.log(err);
      })
  })
  return getLoadByIDPromise;
}