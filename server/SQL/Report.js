module.exports = {
  MissedSalesOrder: `SELECT SCHEDULES.dispatchday,
  inv.invoicenumber AS "CORRECTINV",
  SCHEDULES.origdisp,
  INVORIG.INVOICENUMBER AS "ORIGDISPINVOICE",
  SCHEDULES.customer,
  CASE
      WHEN DISPATCHDAY = ORIGDISP THEN ''
      ELSE 'Different'
  END AS "SCHEDULEDCHANGE",
  CM.CUSTOMERPHONE,
  CM.CUSTOMERMOBILE,
  CM.customerstatus,
  SCHEDULES.schedgroup,
  SCHEDULES.smethod,
  SCHEDULES.cutoffday,
  SCHEDULES.cutofftime
FROM
(SELECT DISTINCT SCHEDGROUP AS "TITLE",
              CUSTOMER,
              ADDITIONALFIELD_50,
              CGROUP,
              SCHEDGROUP,
              SMETHOD,
              CASE
                  WHEN STATUS IS NULL THEN 'NULSTAT'
                  ELSE ''
              END AS "STAT",
              CASE
                  WHEN NEWCUTOFFTIME IS NULL THEN 'ORIGCO'
                  ELSE 'SCHEDCO'
              END AS "COSTAT",
              CASE
                  WHEN STATUS IS NULL THEN CUTOFFDAY
                  ELSE NEWCUTOFFDAY
              END AS "CUTOFFDAY",
              CASE
                  WHEN NEWCUTOFFTIME IS NULL THEN CUTOFFTIME
                  ELSE NEWCUTOFFTIME
              END AS "CUTOFFTIME",
              CASE
                  WHEN STATUS IS NULL THEN DISPATCHDAY
                  ELSE NEWDISPATCH
              END AS "DISPATCHDAY",
              DISPATCHDAY AS "ORIGDISP",
              CASE
                  WHEN STATUS IS NULL THEN DELIVERYDAY
                  ELSE NEWDELIVERY
              END AS "DELIVERYDAY",
              STATUS
FROM
(
with CTE_CSGROUP as 
(
   SELECT CUSTOMERGROUP, "GROUP" FROM CUSTOMERSCHEDULEGROUPS
),
CTE_DATESBETWEEN as
(
   SELECT * FROM RETURN_DATESBETWEEN(CURRENT_DATE - 2, CURRENT_DATE + 12)
)
SELECT 
   UF_CUST_SCHEDULES.CUSTOMER,
    CUSTOMERMASTER.ADDITIONALFIELD_50,
    CASE
        WHEN CUSTOMERMASTER.ADDITIONALFIELD_1 NOT IN
               (SELECT DISTINCT CUSTOMERGROUP
                FROM CUSTOMERSCHEDULEGROUPS) THEN 'Standard'
        ELSE CUSTOMERMASTER.ADDITIONALFIELD_1
    END AS "CGROUP",
    CASE
        WHEN CUSTOMERMASTER.SHIPPINGMETHOD IS NULL THEN 'UniFresh'
        ELSE CUSTOMERMASTER.SHIPPINGMETHOD
    END AS "SMETHOD",
    CUSTOMERMASTER.ADDITIONALFIELD_38 AS "STOREID",
    CO.OUTPUTDATE AS "CUTOFFDAY",
    UF_CUST_SCHEDULES.CUTOFFTIME,
    DI.OUTPUTDATE AS "DISPATCHDAY",
    DE.OUTPUTDATE AS "DELIVERYDAY",
    CASE
        WHEN CSG."GROUP" IS NULL THEN CSGC."GROUP"
        ELSE CSG."GROUP"
    END AS "SCHEDGROUP"
 FROM CUSTOMERMASTER
 LEFT OUTER JOIN CTE_CSGROUP CSGC ON CSGC.CUSTOMERGROUP = CUSTOMERMASTER.ADDITIONALFIELD_1,
 UF_CUST_SCHEDULES
 LEFT OUTER JOIN CTE_CSGROUP CSG ON CSG.CUSTOMERGROUP = UF_CUST_SCHEDULES.CUSTOMER
 LEFT OUTER JOIN CTE_DATESBETWEEN CO ON 
   IIF(UF_CUST_SCHEDULES.CUTOFFDAY = 7,0,UF_CUST_SCHEDULES.CUTOFFDAY) = EXTRACT(WEEKDAY FROM CO.OUTPUTDATE)
 LEFT OUTER JOIN CTE_DATESBETWEEN DI ON 
   IIF(UF_CUST_SCHEDULES.DISPATCHDAY = 7,0,UF_CUST_SCHEDULES.DISPATCHDAY) = EXTRACT(WEEKDAY FROM DI.OUTPUTDATE)
 LEFT OUTER JOIN CTE_DATESBETWEEN DE ON 
   IIF(UF_CUST_SCHEDULES.DELIVERYDAY = 7,0,UF_CUST_SCHEDULES.DELIVERYDAY) = EXTRACT(WEEKDAY FROM DE.OUTPUTDATE)
 WHERE CUSTOMERMASTER.CUSTOMER = UF_CUST_SCHEDULES.CUSTOMER
   AND CUSTOMERMASTER.CUSTOMERSTATUS = 'Active'
   AND DI.OUTPUTDATE BETWEEN CO.OUTPUTDATE AND CO.OUTPUTDATE + 6
   AND DE.OUTPUTDATE BETWEEN DI.OUTPUTDATE AND DI.OUTPUTDATE + 6
 ORDER BY SCHEDGROUP,
       SMETHOD,
       DISPATCHDAY) REGULARSCHED
LEFT OUTER JOIN
(SELECT UF_SCHEDULES.*,
        CUSTOMERSCHEDULEGROUPS.CUSTOMERGROUP,
        CUSTOMERSCHEDULEGROUPS."GROUP"
 FROM UF_SCHEDULES,
      CUSTOMERSCHEDULEGROUPS
 WHERE CUSTOMERSCHEDULEGROUPS."GROUP" = UF_SCHEDULES.GROUPING ) ALTEREDSCHED ON ALTEREDSCHED."GROUP" = REGULARSCHED.SCHEDGROUP
AND ALTEREDSCHED.SHIPPINGMETHOD = REGULARSCHED.SMETHOD
AND ALTEREDSCHED.NORMALDISPATCH = REGULARSCHED.DISPATCHDAY
WHERE (STATUS IS NULL OR STATUS = 'Enabled')
ORDER BY SCHEDGROUP, SMETHOD, DISPATCHDAY) SCHEDULES
LEFT OUTER JOIN
(SELECT *
FROM salesinvoiceheader
WHERE invoicedate >= CURRENT_DATE - 1
AND invoicedate <= CURRENT_DATE + 7 ) INV ON SCHEDULES.DISPATCHDAY = INV.INVOICEDATE
AND SCHEDULES.CUSTOMER = INV.customer
LEFT OUTER JOIN
(SELECT *
FROM salesinvoiceheader
WHERE invoicedate >= CURRENT_DATE - 1
AND invoicedate <= CURRENT_DATE + 7 ) INVORIG ON SCHEDULES.ORIGDISP = INVORIG.INVOICEDATE
AND SCHEDULES.CUSTOMER = INVORIG.customer
LEFT OUTER JOIN
(SELECT customer,
     customerphone,
     customermobile,
     customerstatus,
     additionalfield_60
FROM customermaster) CM ON SCHEDULES.CUSTOMER = CM.CUSTOMER
WHERE (CM.additionalfield_60 IS NULL
  OR CM.additionalfield_60 = 'False')
AND SCHEDULES.customer IN
(SELECT uf_cust_schedules.customer
FROM uf_cust_schedules
LEFT OUTER JOIN
  (SELECT EXTRACT(weekday
                  FROM invoicedate) AS "IVD",
          salesinvoiceheader.*
   FROM salesinvoiceheader
   WHERE invoicedate >= CURRENT_DATE - 29) INV ON uf_cust_schedules.DISPATCHDAY = INV.IVD
AND INV.customer = uf_cust_schedules.customer
GROUP BY uf_cust_schedules.customer
HAVING count(INV.invoicenumber) > 3)
AND inv.invoicenumber IS NULL
AND ((ADDITIONALFIELD_50 = 'Yes'
   AND SCHEDULES.dispatchday >= CURRENT_DATE)
  OR SCHEDULES.dispatchday >= CURRENT_DATE + 1)
AND SCHEDULES.dispatchday <= CURRENT_DATE + 4
AND (SCHEDULES.cutoffday < CURRENT_DATE
  OR (SCHEDULES.cutoffday = CURRENT_DATE
      AND SCHEDULES.cutofftime <= CURRENT_TIME))
ORDER BY DISPATCHDAY,
    UPPER(SCHEDULES.CUSTOMER)`,
  OrderForWrongDate: `SELECT 
    invoicenumber, 
    UFV_INV.customer, 
    UFV_INV.DAYNAME, 
    UFV_INV.invoicedate, 
    UFV_INV.sysusercreated, 
    UFV_INV.invoicetotalamount, 
    UFV_INV.RUNNO,
    UFV_INV.SHIPPINGMETHOD,
    schedgroup, 
    UFV_INV.ADDITIONALFIELD_3 as ShortRep, 
    UFV_INV.ADDITIONALFIELD_4 as Approved,  
    UFV_INV.SUID as "GRIDUNIQUEINDEX" 
    FROM 
    UFV_INV 
    left outer join 
    UFV_SCHEDULES on UFV_INV.CUSTOMER = UFV_SCHEDULES.CUSTOMER AND UFV_INV.INVOICEDATE = UFV_SCHEDULES.DISPATCHDAY 
    where 
    UFV_SCHEDULES.SCHEDGROUP is null and 
    UFV_INV.INVOICEDATE > current_date and 
    UFV_INV.INVOICEDATE <= current_date + 6`,

  ShadowOrderCheck: `select 
    salesheader.ORDERNUMBER, salesheader.REQUIREDDATE, salesheader.ORDERDESCRIPTION, salesheader.sysuniqueid as \"GRIDUNIQUEINDEX\", salesheader.CUSTOMER, salesheader.ORDERPHONE, JN.*
    ,salesinvoiceheader.INVOICEDATE
    from 
    salesinvoiceheader, 
    salesinvoicegrouping,
    salesheader 
    LEFT OUTER JOIN 
    (select 
    salesheader.ORDERNUMBER, salesheader.REQUIREDDATE, salesheader.ORDERDESCRIPTION, salesheader.CUSTOMER, SALESHEADER.ADDITIONALFIELD_3, salesheader.SYSUNIQUEID 
    from 
    salesheader
    where 
    salesheader.REQUIREDDATE >= current_date + 1 and 
    salesheader.SYSUNIQUEID not in 
    (select 
    salesheader.SYSUNIQUEID 
    from 
    salesinvoiceheader, 
    salesinvoicegrouping, 
    salesheader
    where 
    salesinvoiceheader.INVOICENUMBER = salesinvoicegrouping.INVOICENUMBER and 
    salesheader.ORDERNUMBER = salesinvoicegrouping.ORDERNUMBER and 
    salesheader.ORDERNOTES = 'Shadow Order' and 
    salesinvoiceheader.INVOICEDATE >= current_date + 1)) JN on JN.CUSTOMER = salesheader.CUSTOMER AND JN.REQUIREDDATE = salesheader.REQUIREDDATE 
    where 
    salesinvoiceheader.INVOICENUMBER = salesinvoicegrouping.INVOICENUMBER and 
    salesheader.ORDERNUMBER = salesinvoicegrouping.ORDERNUMBER and 
    salesheader.ORDERNOTES = 'Shadow Order' and 
    salesinvoiceheader.INVOICETOTALAMOUNT > 0 and 
    salesinvoiceheader.INVOICEDATE >= current_date + 1 
    ORDER BY 
    salesheader.REQUIREDDATE, SALESHEADER.CUSTOMER`,

  Ostendo_1: `select sysdatecreated, debuglog from SCRIPTDEBUGLOG 
  where debuglog like '%Msg: Counter:%' order by SYSUNIQUEID desc rows 5;`, 
  Ostendo_2: `select sysdatecreated, debuglog from SCRIPTDEBUGLOG order by SYSUNIQUEID desc rows 5;`,
  Count: `select 
  (
  select count(*) as LJ_Count from Journalheader where
  transactionstatus = 'Ready to Send' and
  journaldate between cast('Now' as date)-30 and  'Now'
  ) LJ,
  (
  select count(*) as LSI_Count from JournalInvheader where invoicetype = 'Sales' 
  and
  transactionstatus = 'Ready to Send' and
  INVOICEDATE between cast('Now' as date)-30 and  'Now'
  ) LSI,
  (
  select count(*) as LPI_Count from JournalInvheader where invoicetype = 'Purchase' 
  and
  transactionstatus = 'Ready to Send' and
  INVOICEDATE between cast('Now' as date)-30 and  'Now'
  )LPI
  from RDB$DATABASE;`,
};
