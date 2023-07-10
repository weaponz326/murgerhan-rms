import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';


@Injectable({
  providedIn: 'root'
})
export class InventoryPrintService {

  constructor(
    private printPdf: PrintPdfService,
    public formatId: FormatIdService
  ) { }

  // print purchasings

  printPurchasingsReport(purchasingListData: any, metricsData: any, dates: any){

    var metricsBody = [
      ['No. of Purchasings', ':', metricsData.numberOfPurchasings],
      ['Total Purchased', ':', metricsData.totalPurchased],
    ]

    var tableBody = [['Purchasing ID', 'Purchasing Date', 'Supplier Name', 'Total Price']];

    for (let data of purchasingListData){
      var row = [];
      let rowData: any = data.data();
      row.push(this.formatId.formatId(rowData.purchasing_code, 5, "#", "PC"));
      row.push(rowData.purchasing_date);
      row.push(rowData.supplier.data.supplier_name);
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

    var header = 'Murger Han Hub - Purchasing Report';
    this.printPdf.openPdf(header, content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

}
