const CustomerOrderSchedule = async (username) => {
    let Report = `
    
    select DISTINCT
SCHED.*,
CASE when INV.INVOICENUMBER is null then 'NA' else 'INVOICE' END as "INVOICE" from
(
select
distinct
CUSTOMER,
SCHEDGROUP,
SMETHOD,
CASE when STATUS is null then CASE when EXTRACT(weekday from CUTOFFDAY) = 1 then 'Monday' else CASE when EXTRACT(weekday from CUTOFFDAY) = 2 then 'Tuesday' else CASE when EXTRACT(weekday from CUTOFFDAY) = 3 then 'Wednesday' else CASE when EXTRACT(weekday from CUTOFFDAY) = 4 then 'Thursday' else CASE when EXTRACT(weekday from CUTOFFDAY) = 5 then 'Friday' else CASE when EXTRACT(weekday from CUTOFFDAY) = 6 then 'Saturday' else 'Sunday' END END END END END END else CASE when EXTRACT(weekday from NEWCUTOFFDAY) = 1 then 'Monday' else CASE when EXTRACT(weekday from NEWCUTOFFDAY) = 2 then 'Tuesday' else CASE when EXTRACT(weekday from NEWCUTOFFDAY) = 3 then 'Wednesday' else CASE when EXTRACT(weekday from NEWCUTOFFDAY) = 4 then 'Thursday' else CASE when EXTRACT(weekday from NEWCUTOFFDAY) = 5 then 'Friday' else CASE when EXTRACT(weekday from NEWCUTOFFDAY) = 6 then 'Saturday' else 'Sunday' END END END END END END END as "CUTOFFDAYNAME",
CASE when STATUS is null then CUTOFFDAY else NEWCUTOFFDAY END as "CUTOFFDAY",
CASE when NEWCUTOFFTIME is null then CUTOFFTIME else NEWCUTOFFTIME END as "CUTOFFTIME",
CASE when STATUS is null then CASE when EXTRACT(weekday from DISPATCHDAY) = 1 then 'Monday' else CASE when EXTRACT(weekday from DISPATCHDAY) = 2 then 'Tuesday' else CASE when EXTRACT(weekday from DISPATCHDAY) = 3 then 'Wednesday' else CASE when EXTRACT(weekday from DISPATCHDAY) = 4 then 'Thursday' else CASE when EXTRACT(weekday from DISPATCHDAY) = 5 then 'Friday' else CASE when EXTRACT(weekday from DISPATCHDAY) = 6 then 'Saturday' else 'Sunday' END END END END END END else CASE when EXTRACT(weekday from NEWDISPATCH) = 1 then 'Monday' else CASE when EXTRACT(weekday from NEWDISPATCH) = 2 then 'Tuesday' else CASE when EXTRACT(weekday from NEWDISPATCH) = 3 then 'Wednesday' else CASE when EXTRACT(weekday from NEWDISPATCH) = 4 then 'Thursday' else CASE when EXTRACT(weekday from NEWDISPATCH) = 5 then 'Friday' else CASE when EXTRACT(weekday from NEWDISPATCH) = 6 then 'Saturday' else 'Sunday' END END END END END END END as "DISPATCHDAYNAME",
CASE when STATUS is null then DISPATCHDAY else NEWDISPATCH END as "DISPATCHDAY",
CASE when STATUS is null then CASE when EXTRACT(weekday from DELIVERYDAY) = 1 then 'Monday' else CASE when EXTRACT(weekday from DELIVERYDAY) = 2 then 'Tuesday' else CASE when EXTRACT(weekday from DELIVERYDAY) = 3 then 'Wednesday' else CASE when EXTRACT(weekday from DELIVERYDAY) = 4 then 'Thursday' else CASE when EXTRACT(weekday from DELIVERYDAY) = 5 then 'Friday' else CASE when EXTRACT(weekday from DELIVERYDAY) = 6 then 'Saturday' else 'Sunday' END END END END END END else CASE when EXTRACT(weekday from NEWDELIVERY) = 1 then 'Monday' else CASE when EXTRACT(weekday from NEWDELIVERY) = 2 then 'Tuesday' else CASE when EXTRACT(weekday from NEWDELIVERY) = 3 then 'Wednesday' else CASE when EXTRACT(weekday from NEWDELIVERY) = 4 then 'Thursday' else CASE when EXTRACT(weekday from NEWDELIVERY) = 5 then 'Friday' else CASE when EXTRACT(weekday from NEWDELIVERY) = 6 then 'Saturday' else 'Sunday' END END END END END END END as "DELIVERYDAYNAME",
CASE when STATUS is null then DELIVERYDAY else NEWDELIVERY END as "DELIVERYDAY"
from
(
  select
  UF_CUST_SCHEDULES.CUSTOMER,
  CASE when CUSTOMERMASTER.ADDITIONALFIELD_1 not in (select distinct CUSTOMERGROUP from CUSTOMERSCHEDULEGROUPS) then 'Standard' else CUSTOMERMASTER.ADDITIONALFIELD_1 END as "CGROUP",
  CASE when CUSTOMERMASTER.SHIPPINGMETHOD is null then 'UniFresh' else CUSTOMERMASTER.SHIPPINGMETHOD END as "SMETHOD",
  CUSTOMERMASTER.ADDITIONALFIELD_38 as "STOREID",
  CO.OUTPUTDATE as "CUTOFFDAY",
  UF_CUST_SCHEDULES.CUTOFFTIME,
  DI.OUTPUTDATE as "DISPATCHDAY",
  DE.OUTPUTDATE as "DELIVERYDAY",
  CASE when CSG."GROUP" is null then CSGC."GROUP" else CSG."GROUP" END as "SCHEDGROUP"
  from
  CUSTOMERMASTER
  left outer join (select CUSTOMERGROUP, "GROUP" from CUSTOMERSCHEDULEGROUPS) CSGC on CSGC.CUSTOMERGROUP = CUSTOMERMASTER.ADDITIONALFIELD_1,
  UF_CUST_SCHEDULES
  left outer join (select CUSTOMERGROUP, "GROUP" from CUSTOMERSCHEDULEGROUPS) CSG on CSG.CUSTOMERGROUP = UF_CUST_SCHEDULES.CUSTOMER
  left outer join (select * from RETURN_DATESBETWEEN(current_date - 5, dateadd(10 day to dateadd(1 month to current_date)))) CO on CASE when UF_CUST_SCHEDULES.CUTOFFDAY = 7 then 0 else UF_CUST_SCHEDULES.CUTOFFDAY END = EXTRACT(WEEKDAY from CO.OUTPUTDATE)
  left outer join (select * from RETURN_DATESBETWEEN(current_date - 5, dateadd(10 day to dateadd(1 month to current_date)))) DI on CASE when UF_CUST_SCHEDULES.DISPATCHDAY = 7 then 0 else UF_CUST_SCHEDULES.DISPATCHDAY END = EXTRACT(WEEKDAY from DI.OUTPUTDATE)
  left outer join (select * from RETURN_DATESBETWEEN(current_date - 5, dateadd(10 day to dateadd(1 month to current_date)))) DE on CASE when UF_CUST_SCHEDULES.DELIVERYDAY = 7 then 0 else UF_CUST_SCHEDULES.DELIVERYDAY END = EXTRACT(WEEKDAY from DE.OUTPUTDATE)
  where
  CUSTOMERMASTER.CUSTOMER = '${username}' and
  CUSTOMERMASTER.CUSTOMER = UF_CUST_SCHEDULES.CUSTOMER and
  DI.OUTPUTDATE <= CO.OUTPUTDATE + 6 and
  DI.OUTPUTDATE >= CO.OUTPUTDATE and
  DE.OUTPUTDATE <= DI.OUTPUTDATE + 6 and
  DE.OUTPUTDATE >= DI.OUTPUTDATE
  order by
  SCHEDGROUP, SMETHOD, UF_CUST_SCHEDULES.CUSTOMER, CO.OUTPUTDATE
) REGULARSCHED
left outer join
(
  select UF_SCHEDULES.*,
  CUSTOMERSCHEDULEGROUPS.CUSTOMERGROUP,
  CUSTOMERSCHEDULEGROUPS."GROUP"
  from
  UF_SCHEDULES,
  CUSTOMERSCHEDULEGROUPS
  where
  CUSTOMERSCHEDULEGROUPS."GROUP" = UF_SCHEDULES.GROUPING
) ALTEREDSCHED on ALTEREDSCHED."GROUP" = REGULARSCHED.SCHEDGROUP and ALTEREDSCHED.SHIPPINGMETHOD = REGULARSCHED.SMETHOD and ALTEREDSCHED.NORMALDISPATCH = REGULARSCHED.DISPATCHDAY
where
(STATUS is null or STATUS = 'Enabled')
order by
SCHEDGROUP, SMETHOD, DISPATCHDAY
) SCHED
left outer join
(
    SELECT DISTINCT SIH.* FROM salesinvoiceheader SIH
        INNER JOIN SALESINVOICELINES SIL ON SIL.INVOICENUMBER=SIH.INVOICENUMBER
    WHERE
        SIH.CUSTOMER = '${username}' AND
        SIH.INVOICEDATE >= CURRENT_DATE - 5 AND
        SIH.INVOICEDATE <= DATEADD(10 day to DATEADD(1 month to CURRENT_DATE)) AND
        (SIL.LINECODE != 'GIFT1' AND SIL.LINECODE != 'GIFT')
) INV on INV.INVOICEDATE = SCHED.DISPATCHDAY
where
(INV.INVOICENUMBER is NOT null OR (CUTOFFDAY > CURRENT_DATE OR (CUTOFFDAY = current_date and CUTOFFTIME > CURRENT_TIME)))
order by
SCHEDGROUP, SMETHOD, DISPATCHDAY


    `;
    const requestEndpoint = `http://sw.unifresh.com.au:82/sqlquery/?apikey=Ytm1VIhM2ai7fewNDR1QpEypr%2FuqXBZvspibPCxoBoLiXyEA8DVaP2BcAiw6th%2Bvgj7Gcr%2FwuXPDWyCpABxO3FQLtzLlgOsh4YFHHNcCx55E4LUDYWA%3D&format=json`;
    const response = await fetch(requestEndpoint, {
      method: "POST",
      body: Report,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  };
  module.exports = CustomerOrderSchedule;
  