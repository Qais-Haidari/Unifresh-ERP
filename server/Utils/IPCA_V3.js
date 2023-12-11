const IPCA_V3 = async (start, end) => {
  let Report = `select 
  F.itemdescription as "Product Name", 
  --CASE when round(CAST(itemmaster_addfields_uf.SUBKG as DECIMAL(18,2))) = CAST(itemmaster_addfields_uf.SUBKG as DECIMAL(18,2)) then round(CAST(itemmaster_addfields_uf.SUBKG as DECIMAL(18,2))) else CAST(itemmaster_addfields_uf.SUBKG as DECIMAL(18,2)) END as "AB",
  CASE when 
    CAST(itemmaster_addfields_uf.SUBQTY as DECIMAL(18,2)) || 'X' || CAST(itemmaster_addfields_uf.SUBKG as DECIMAL(18,2)) || 'KG' is null 
    then 
    '1X' || trim(trailing '.' from 
    trim(trailing '0' from cast(F.ADDITIONALFIELD_1 as DECIMAL(18,2)))) || 'KG' 
    else 
    trim(trailing '.' from 
    trim(trailing '0' from 
    CAST(itemmaster_addfields_uf.SUBQTY as DECIMAL(18,2)))) || 'X' || 
    trim(trailing '.' from 
    trim(trailing '0' from 
    CAST(itemmaster_addfields_uf.SUBKG as DECIMAL(18,2))))
    || 'KG' 
  END as "Case Configuration", 
  F.itemcode as "Suppliers Product No", 
  upper(customermaster.deliverystate) || ' - ' || upper(left(customermaster.additionalfield_42,1)) || lower(right(customermaster.additionalfield_42,char_length(customermaster.additionalfield_42) - 1)) as "Region",  
  'AUD' as "Selling Currency", 
  CAST(SUM(SALESINVOICELINES.EXTENDEDTOTALPRICE) AS DECIMAL(18,2)) as "Total Sales Value", 
  'Case' as "Selling Unit", 
  SUM(salesinvoicelines.INVOICEQTY) as "Total Sales Volume", 
  EXTRACT(month from salesinvoiceheader.invoicedate) as "SaleMonth", 
  EXTRACT(year from salesinvoiceheader.invoicedate) as "SaleYear", 
  cast(customermaster.ADDITIONALFIELD_38 as Varchar(199)) as "Subway Restaurant Number", 
  customermaster.CUSTOMER as "Suppliers Customer ID", 
  customermaster.CUSTOMER as "Restaurant Name", 
  case when customermaster.deliveryaddress2 is null then 
  customermaster.deliveryaddress1 else 
  customermaster.deliveryaddress1 || ', ' || customermaster.deliveryaddress2 END as "Address", 
  customermaster.deliverycity as "Suburb", 
  customermaster.deliverystate as "State", 
  customermaster.deliverypostalcode as "Postcode", 
  '1' as "GRIDUNIQUEINDEX" 
  from 
  customermaster, salesinvoiceheader, salesinvoicelines, itemmaster_addfields_uf, itemmaster, (select itemcode, itemdescription, additionalfield_1 from itemmaster) F
  where 
  itemmaster_addfields_uf.ITEMCODE = F.ITEMCODE and 
  salesinvoiceheader.invoicedate >= cast('${start}' as Date) and 
  --salesinvoiceheader.invoicedate >= cast('${end}' as Date) and
  salesinvoiceheader.invoicedate < cast('2018-08-31' as Date) and 
  --salesinvoiceheader.invoicedate < cast('2018-08-31' as Date) and
  (F.itemcode = itemmaster.ADDITIONALFIELD_23  OR F.itemcode = itemmaster.itemcode ) and 
  customermaster.customer = salesinvoiceheader.customer and 
  salesinvoiceheader.invoicenumber = salesinvoicelines.invoicenumber and 
  salesinvoicelines.linecode = itemmaster.itemcode and 
  (customermaster.additionalfield_1 = 'Subway' or UPPER(customermaster.customer) like 'SUBWAY%')
  AND customermaster.CUSTOMER <> 'SW Test WA Armadale'
  --(customermaster.additionalfield_1 = 'Subway' or UPPER(customermaster.customer) like 'SUBWAY%'
  --or (upper(customermaster.customer) like 'SIMON GEORGE%' and itemmaster.itemcode in ('CSHB46','SGSUBLPC42.5'))
  --) 
  and customermaster.additionalfield_38 is not null
   
  group by 
  --"Month", "Year", "DERCODE", 
  F.itemdescription, "Case Configuration", F.itemcode, "Region", "Subway Restaurant Number", "Suppliers Customer ID", EXTRACT(month from salesinvoiceheader.invoicedate), EXTRACT(year from salesinvoiceheader.invoicedate), "Restaurant Name", 
  "Address", "Suburb", "State", "Postcode"  
  order by 
  EXTRACT(month from salesinvoiceheader.invoicedate) asc, EXTRACT(year from salesinvoiceheader.invoicedate) desc, "Region"`;
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
module.exports = IPCA_V3;
