import { Injectable } from '@angular/core';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class OrdersPrintService {

  constructor(
    private printPdf: PrintPdfService
  ) { }

  // print orders

  printOrdersReport(orderListData: any, metricsData: any, dates: any){

    var metricsBody = [
      ['No. of Orders', ':', metricsData.numberOfOrders],
      ['Total Sales', ':', metricsData.totalSales],
    ]

    var tableBody = [['Order ID', 'Order Date', 'Vendor Name', 'Total Price']];

    for (let data of orderListData){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.order_code);
      row.push(rowData.order_date);
      row.push(rowData.vendor.data.vendor_name);
      row.push(rowData.total_price);
      tableBody.push(row);
    }

    let content = [
      {
        columns: [          
          [ 
            {
              layout: 'noBorders',
              table: {
                headerRows: 0,
                widths: ['33%', '2%', '65%'],
                body: metricsBody
              }
            }
          ],
          [
            { text: "From  " + this.dateFormat(dates.startDate) + " , " + "To  " + this.dateFormat(dates.endDate) },
          ]
        ]
      },
      { text: "", margin: [0, 20, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '25%', '40%', '20%'],
          body: tableBody
        }
      }
    ]

    var header = 'Murger Han Hub - Orders Report';
    this.printPdf.openPdf(header, content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

}
