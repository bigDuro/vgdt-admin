export const getBrokerActions = (context, table, history) => {
  const { saveRecord, getRecord, getData } = context;
  return {
    handleSave: (record, updateTable, recordIdToUpdate) => {
      return new Promise((resolve, reject) => {
        saveRecord(table, record).then( data => {
          if(updateTable && recordIdToUpdate && data.id) {
            getRecord(updateTable, recordIdToUpdate).then(load => {
              const updatedLoad = { ...load };
              updatedLoad.broker = data.id;
              saveRecord(updateTable, updatedLoad).then(data => {
                getData(updateTable, true).then(response => {
                  history.goBack();
                  resolve(data);
                })
              })
            }).catch(e => {
              reject(e);
            })
          }else {
            history.goBack();
            resolve(data);
          }
        })
      })

    }
  }
}
