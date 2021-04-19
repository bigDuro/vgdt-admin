export const getCommonActions = (table, history, context) => {
  const { filterRecords, deleteRecord, getData, getRecord, setRecord, getAssetsFor } = context;
  return {
      handleClick: (id) => {
        getRecord(table, id).then(data => {
          filterRecords(id)
          getAssetsFor(table, id)
          history.push(`${table}/${id}`);
          return true
        })
      },
      handleChange: (e) => {
        e.preventDefault();
        filterRecords(e.target.value)
      },
      handleAdd: () => {
        setRecord(false);
        getData(table, true).then(response => {
          history.push(`${table}/add`);
          return true
        })
      },
      handleRefresh: (tbl) => {
        getData(table, true)
      },
      handleDelete: (ids) => {
        deleteRecord(table, ids).then(data => {
          getData(table, true)
        });
      },
      handleClear: () => {
        filterRecords('');
      },
      handleUpload: (id) => {
        getAssetsFor(table, id).then(data => {
          history.push(`assets/${table}/${id}`);
        })

      }
    }
}
