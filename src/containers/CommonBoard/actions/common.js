export const getCommonActions = (table, history) => {
  // const store = table;
  // const refreshData = (store) => {
  //   getAllRecords(store).then(data => {
  //     setTableData(store, data);
  //     return data
  //   });
  // }
  return {
      handleClick: (id) => {
        history.push(`${table}/${id}`);
      },
      handleChange: (e) => {
        e.preventDefault();
        // const fields = filterFields;
        // filterRecords(table, fields, e.target.value)
        console.log('handleChange');
      },
      handleAdd: () => {
        history.push(`${table}/add`);
      },
      handleRefresh: false,
      handleDelete: (ids) => {
        // deleteRecord(table, ids).then(data => {
        //   refreshData(store)
        // });
        console.log('handleDelete');
      },
      handleExport: false,
      handleStatus: false,
      getDriver: () => '',
      getDrivers: () => []
    }
}
