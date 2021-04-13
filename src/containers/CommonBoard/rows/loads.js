export const getLoadRowData = (rows, tables) => {

  return rows.map(row => {
    const newRow = {...row};

    if(tables.brokers && tables.brokers.length) {
      tables.brokers.map(broker => {
        if (broker.id === row.broker) {
          newRow.brokerName = broker.name;
          newRow.hasQuickPay = broker.quickPay !== "0" && broker.quickPay > 0;
          newRow.paymentTerms = broker.paymentTerms;
        }
        return broker
      })
    }

    if(tables.employees && tables.employees.length) {
      tables.employees.map(user => {
        if (user.id === row.driver) {
          newRow.driverName = `${user.firstname} ${user.lastname}`
          newRow.driverRate = user.compensation
          newRow.detentionPay = parseInt(user.detentionRate) * parseInt(row.detentionPay);
          newRow.layoverPay = parseInt(user.layoverRate) * parseInt(row.layoverPay);
        }

        if (user.id === row.user) {
          newRow.user = `${user.firstname} ${user.lastname}`
        }
        return user
      })
    }

    if(tables.equipment && tables.equipment.length) {
      tables.equipment.map(tractor => {
        if (tractor.id === row.tractor) {
          newRow.unit_num = tractor.unit_num
        }
        return tractor
      })
    }


    newRow.rate = row.tonu === '1' ? 0 : row.rate;
    newRow.pickupDate = new Date(row.pickupDate).toLocaleString();
    newRow.dropoffDate = new Date(row.dropoffDate).toLocaleString();
    return newRow;
  })
}
