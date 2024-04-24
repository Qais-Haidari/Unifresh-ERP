const axios = require('axios');
const nodemailer = require('nodemailer');
const { createWriteStream } = require('fs');
const KFC_YUM = async (start, end) => {
    const Start = start.split("-").reverse().join("-");
    const End = end.split("-").reverse().join("-");
    const Report = `
    select 
      '1' as "HEADERNUMBER", 
      RPAD(REPLACE(salesinvoiceheader.INVOICENUMBER,'UF',''),10,' ') as "INVOICENUMBER", 
      salesinvoiceheader.INVOICENUMBER as "ACTUALINVOICENUMBER", 
      salesinvoiceheader.FREIGHTTOTALAMOUNT as "FREIGHTTOTALAMOUNT", 
      LPAD(REPLACE(REPLACE(CAST(CAST(salesinvoiceheader.FREIGHTNETTAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as "CONVERTEDFREIGHTNETT", 
      LPAD(REPLACE(REPLACE(CAST(CAST(salesinvoiceheader.FREIGHTTAXAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as "CONVERTEDFREIGHTTAX", 
      LPAD(REPLACE(REPLACE(CAST(CAST(salesinvoiceheader.FREIGHTTOTALAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as "CONVERTEDFREIGHT", 
      LPAD(CUSTOMERMASTER.ADDITIONALFIELD_38,5,'0') as "STORENUMBER", 
      SUBSTRING(EXTRACT(YEAR FROM SALESINVOICEHEADER.INVOICEDATE) FROM 3 FOR 2) || lpad(EXTRACT(MONTH FROM SALESINVOICEHEADER.INVOICEDATE), 2, '0') || lpad(EXTRACT(DAY FROM SALESINVOICEHEADER.INVOICEDATE), 2, '0') as "INVOICEDATE", 
      SUBSTRING(EXTRACT(YEAR FROM CURRENT_DATE) FROM 3 FOR 2) || lpad(EXTRACT(MONTH FROM CURRENT_DATE), 2, '0') || lpad(EXTRACT(DAY FROM CURRENT_DATE), 2, '0') as "TODAYDATE",
      LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICEHEADER.INVOICENETTAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as "INVOICETOTAL", 
      CASE WHEN SALESINVOICEHEADER.INVOICENETTAMOUNT >= 0 THEN '+' ELSE '-' END as "INVOICETOTALSIGN", 
      LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICEHEADER.INVOICETAXAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as "INVOICETAX", 
      CASE WHEN SALESINVOICEHEADER.INVOICETAXAMOUNT >= 0 THEN '+' ELSE '-' END as "INVOICETAXSIGN", 
      LPAD(REPLACE(REPLACE(CAST(CAST(SALESINVOICEHEADER.INVOICETOTALAMOUNT AS DECIMAL(18,2)) AS VARCHAR(15)),'.',''),'-',''),15,'0') as "INVOICEPAYABLE", 
      CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN '+' ELSE '-' END as "INVOICEPAYABLESIGN", 
      RPAD(CAST(SALESINVOICEHEADER.CUSTOMER as VARCHAR(30)),30,' ') as "DESCRIPTION", 
      CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN RPAD('TAX INVOICE',20,' ') ELSE RPAD('CREDIT INVOICE',20,' ') END as "INVOICEORCREDIT",
      '000000000000000' as "ORIGINVPAYABLETOTAL", 
      CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN '+' ELSE '-' END as "ORIGINVPAYABLESIGN", 
      '000000000000000' as "CORRECTEDPRICE",
      CASE WHEN SALESINVOICEHEADER.INVOICENETTAMOUNT >= 0 THEN '+' ELSE '-' END as "CORRECTEDPRICESIGN", 
      '000000000000000' as "PRICEDIFFERENCETOTAL", 
      CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN '+' ELSE '-' END as "PRICEDIFFERENCETOTALSIGN", 
      '000000000000000' as "TAXDIFFERENCETOTAL", 
      CASE WHEN SALESINVOICEHEADER.INVOICETOTALAMOUNT >= 0 THEN '+' ELSE '-' END as "TAXDIFFERENCETOTALSIGN" 	
      from 
      salesinvoiceheader, 
      customermaster 
      where 
      salesinvoiceheader.CUSTOMER = customermaster.customer and 
      customermaster.additionalfield_1 like '%KFC%' and  
      salesinvoiceheader.invoicedate between '${Start}' and '${End}' and 
      customermaster.additionalfield_40 = 'KFC Yum' and 
      customermaster.additionalfield_38 like '7%' and 
      salesinvoiceheader.BATCHNUMBER is null 
      order by 
      SALESINVOICEHEADER.INVOICEDATE asc
    `
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
module.exports = KFC_YUM;