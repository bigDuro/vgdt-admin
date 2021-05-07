export const getCommonActions = (context, table, history) => {
  const { saveRecord, setRecord, getData } = context;
  return {
    handleSave: (record) => {
      return new Promise((resolve, reject) => {
        saveRecord(table, record).then(data => {
          getData(table, true).then(response => {
            history.goBack();
            setRecord(data);
            resolve(data);
          })
        })
      })
    },
    handleChange: (data) => {
      // console.log(data);
      // setRecord(data);
    },
    handleBack: () => {
      history.goBack();
      setRecord(false);
    }
  }
}
