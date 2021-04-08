export const getRowData = (rows, actions, editButton) => {
  console.log('getRowData:: ');
  return rows.map(row => {
    const newRow = {...row};
    newRow.edit = editButton(row.id, actions);
    return newRow;
  })
}
