export const getBrokerRowData = (rows) => {
  return rows.map(row => {
    const newRow = {...row};
    // newRow.edit = editButton(row.id, actions);
    newRow.quickPay = row.quickPay === "0" ? "No" : "Yes"
    return newRow;
  })
}
