const Holding = require('../../../Model/AccountLinkMonitor/Holding')
const MissingCustomerSchedules = async (name) => {
  return await Holding.find()
  };
  module.exports = MissingCustomerSchedules;