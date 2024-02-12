module.exports = {
    Customer: `select 
    CUSTOMERMASTER.CUSTOMER,
    CUSTOMERMASTER.PRIMARYCONTACT,
    CUSTOMERMASTER.SHIPPINGMETHOD
     from CUSTOMERMASTER where customermaster.CUSTOMERSTATUS = 'Active'`,
  };
  