SELECT CBSCHEDS.customer, CBSCHEDS.dispatchday, CBSCHEDS.deliveryday,
             CASE WHEN CBSCHEDS.dispatchday <= CBSCHEDS.deliveryday 
              THEN CBSCHEDS.dispatchday - CBSCHEDS.deliveryday
             ELSE CBSCHEDS.deliveryday - CBSCHEDS.dispatchday + 1
             END AS "Diff",
             cast('now' as date) as "dt",
             case when CBSCHEDS.dispatchday <= cast('now' as date) then 'INVALID' else 'VALID' END  as "VCHECK"
      FROM
        (SELECT DISTINCT CUSTOMER, additionalfield_38, CGROUP, 
          SCHEDGROUP, SMETHOD,
            CASE WHEN STATUS IS NULL THEN 'NULSTAT' ELSE '' END AS "STAT",
            CASE WHEN NEWCUTOFFTIME IS NULL 
              THEN 'ORIGCO' ELSE 'SCHEDCO' END AS "COSTAT",
            CASE WHEN STATUS IS NULL 
              THEN CASE EXTRACT(weekday FROM CUTOFFDAY) 
                  WHEN 1 THEN 'Monday' WHEN 2 THEN 'Tuesday' 
                  WHEN 3 THEN 'Wednesday'
                  WHEN 4 THEN 'Thursday' WHEN 5 THEN 'Friday' 
                  WHEN 6 THEN 'Saturday'
                  ELSE 'Sunday' 
                  END
               ELSE CASE EXTRACT(weekday FROM NEWCUTOFFDAY)
                  WHEN 1 THEN 'Monday' WHEN 2 THEN 'Tuesday' 
                  WHEN 3 THEN 'Wednesday'
                  WHEN 4 THEN 'Thursday' WHEN 5 THEN 'Friday' 
                  WHEN 6 THEN 'Saturday'
                  ELSE 'Sunday' 
                  END
               END AS "CUTOFFDAYNAME",
             CASE WHEN STATUS IS NULL THEN CUTOFFDAY 
              ELSE NEWCUTOFFDAY END AS "CUTOFFDAY",
             CASE WHEN NEWCUTOFFTIME IS NULL THEN CUTOFFTIME 
              ELSE NEWCUTOFFTIME END AS "CUTOFFTIME",
             CASE WHEN STATUS IS NULL 
              THEN CASE EXTRACT(weekday FROM DISPATCHDAY)
                  WHEN 1 THEN 'Monday' WHEN 2 THEN 'Tuesday' 
                  WHEN 3 THEN 'Wednesday'
                  WHEN 4 THEN 'Thursday' WHEN 5 THEN 'Friday' 
                  WHEN 6 THEN 'Saturday'
                  ELSE 'Sunday' 
                  END
               ELSE CASE EXTRACT(weekday FROM NEWDISPATCH)
                  WHEN 1 THEN 'Monday' WHEN 2 THEN 'Tuesday' 
                  WHEN 3 THEN 'Wednesday'
                  WHEN 4 THEN 'Thursday' WHEN 5 THEN 'Friday' 
                  WHEN 6 THEN 'Saturday'
                  ELSE 'Sunday' 
                  END
               END AS "DISPATCHDAYNAME",
             CASE WHEN STATUS IS NULL THEN DISPATCHDAY 
              ELSE NEWDISPATCH END AS "DISPATCHDAY",
             CASE WHEN STATUS IS NULL 
              THEN CASE EXTRACT(weekday FROM DELIVERYDAY) 
                  WHEN 1 THEN 'Monday' WHEN 2 THEN 'Tuesday' 
                  WHEN 3 THEN 'Wednesday'
                  WHEN 4 THEN 'Thursday' WHEN 5 THEN 'Friday' 
                  WHEN 6 THEN 'Saturday'
                  ELSE 'Sunday' END
               ELSE CASE EXTRACT(weekday FROM NEWDELIVERY)
                  WHEN 1 THEN 'Monday' WHEN 2 THEN 'Tuesday' 
                  WHEN 3 THEN 'Wednesday'
                  WHEN 4 THEN 'Thursday' WHEN 5 THEN 'Friday' 
                  WHEN 6 THEN 'Saturday'
                  ELSE 'Sunday' 
                  END
               END AS "DELIVERYDAYNAME",
               CASE WHEN STATUS IS NULL THEN DELIVERYDAY 
                ELSE NEWDELIVERY END AS "DELIVERYDAY",
               DISPATCHDAY AS "ORIGINALDISPATCH", STATUS, CUSTOMERSTATUS
         FROM
          (SELECT UF_CUST_SCHEDULES.CUSTOMER,
            CASE
              WHEN CSG."GROUP" IS NULL THEN CSGC."GROUP"
              ELSE CSG."GROUP"
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
             CUSTOMERMASTER.CUSTOMERSTATUS,
             CUSTOMERMASTER.additionalfield_38,
             CUSTOMERMASTER.ADDITIONALFIELD_47,
            CASE
                 WHEN CSG."GROUP" IS NULL THEN CSGC."GROUP"
                 ELSE CSG."GROUP"
             END AS "SCHEDGROUP"
            FROM CUSTOMERMASTER
            LEFT OUTER JOIN (SELECT CUSTOMERGROUP, 
              "GROUP" FROM CUSTOMERSCHEDULEGROUPS) CSGC ON 
              CASE WHEN CUSTOMERMASTER.CUSTOMER NOT IN
                 (SELECT DISTINCT CUSTOMERGROUP FROM CUSTOMERSCHEDULEGROUPS)
              THEN 
                CASE WHEN CUSTOMERMASTER.ADDITIONALFIELD_1 NOT IN
                 (SELECT DISTINCT CUSTOMERGROUP FROM CUSTOMERSCHEDULEGROUPS)
                THEN 
                  'Standard'
                ELSE 
                  CUSTOMERMASTER.ADDITIONALFIELD_1 
                END
              ELSE 
                CUSTOMERMASTER.CUSTOMER 
              END = CSGC.CUSTOMERGROUP,
              UF_CUST_SCHEDULES
            LEFT OUTER JOIN
              (SELECT CUSTOMERGROUP, "GROUP" FROM CUSTOMERSCHEDULEGROUPS) CSG 
                ON CSG.CUSTOMERGROUP = UF_CUST_SCHEDULES.CUSTOMER
            LEFT OUTER JOIN
              (SELECT * FROM 
              RETURN_DATESBETWEEN(CURRENT_DATE - 12, CURRENT_DATE + 20)) CO 
              ON CASE WHEN UF_CUST_SCHEDULES.CUTOFFDAY = 7 
              THEN 0
              ELSE UF_CUST_SCHEDULES.CUTOFFDAY 
              END = EXTRACT(WEEKDAY FROM CO.OUTPUTDATE)
            LEFT OUTER JOIN
              (SELECT * FROM 
              RETURN_DATESBETWEEN(CURRENT_DATE - 12, CURRENT_DATE + 20)) DI 
              ON CASE 
                WHEN UF_CUST_SCHEDULES.DISPATCHDAY = 7 THEN 0
                ELSE UF_CUST_SCHEDULES.DISPATCHDAY 
              END = EXTRACT(WEEKDAY FROM DI.OUTPUTDATE)
            LEFT OUTER JOIN
              (SELECT * FROM 
                RETURN_DATESBETWEEN(CURRENT_DATE - 12, CURRENT_DATE + 20)) DE 
                ON 
                CASE 
                  WHEN UF_CUST_SCHEDULES.DELIVERYDAY = 7 THEN 0
                  ELSE UF_CUST_SCHEDULES.DELIVERYDAY
                END = EXTRACT(WEEKDAY FROM DE.OUTPUTDATE)
            WHERE CUSTOMERMASTER.CUSTOMER = UF_CUST_SCHEDULES.CUSTOMER
              AND DI.OUTPUTDATE <= CO.OUTPUTDATE + 6
              AND DI.OUTPUTDATE >= CO.OUTPUTDATE
              AND DE.OUTPUTDATE <= DI.OUTPUTDATE + 6
              AND DE.OUTPUTDATE >= DI.OUTPUTDATE
            ORDER BY SCHEDGROUP,
                     SMETHOD,
                     UF_CUST_SCHEDULES.CUSTOMER,
                     CO.OUTPUTDATE) REGULARSCHED
         LEFT OUTER JOIN
           (SELECT UF_SCHEDULES.*, CUSTOMERSCHEDULEGROUPS.CUSTOMERGROUP, 
              CUSTOMERSCHEDULEGROUPS."GROUP"
            FROM UF_SCHEDULES, CUSTOMERSCHEDULEGROUPS
            WHERE CUSTOMERSCHEDULEGROUPS."GROUP" = 
                UF_SCHEDULES.GROUPING ) ALTEREDSCHED 
              ON ALTEREDSCHED."GROUP" = REGULARSCHED.SCHEDGROUP
         AND ALTEREDSCHED.SHIPPINGMETHOD = REGULARSCHED.SMETHOD
         AND ALTEREDSCHED.NORMALDISPATCH = REGULARSCHED.DISPATCHDAY
         WHERE (STATUS IS NULL OR STATUS = 'Enabled')
           AND ADDITIONALFIELD_47 = 'Perecorp' 
           AND customerstatus = 'Active'
         ORDER BY SCHEDGROUP, SMETHOD, CUSTOMER, DISPATCHDAY) CBSCHEDS
      WHERE CBSCHEDS.additionalfield_38 = '40698'
        AND CBSCHEDS.deliveryday = CAST('24/01/2024' AS Date) 