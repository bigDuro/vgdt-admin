export const getBrokerActions = (context, table, history) => {
  const { saveRecord, getRecord } = context;
  return {
    handleSave: (record, updateTable, recordIdToUpdate) => {
      return new Promise((resolve, reject) => {
        saveRecord(table, record).then( data => {
          if(updateTable && recordIdToUpdate && data.id) {
            getRecord(updateTable, recordIdToUpdate).then(load => {
              const updatedLoad = { ...load };
              updatedLoad.broker = data.id;
              saveRecord(updateTable, updatedLoad).then(data => {
                history.goBack();
                resolve(data);
              })
            })
          }else {
            history.goBack();
            resolve(data);
          }
        })
      })

    },
    handleChange: (data) => {
    },
    handleBack: () => {
      history.goBack()
    }
  }
}