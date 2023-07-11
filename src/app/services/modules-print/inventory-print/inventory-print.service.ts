import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';
import { InventoryApiService } from '../../modules-api/inventory-api/inventory-api.service';


@Injectable({
  providedIn: 'root'
})
export class InventoryPrintService {

  constructor(
    private printPdf: PrintPdfService,
    private formatId: FormatIdService,
    private inventoryApi: InventoryApiService
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

  // print view purchasing

  async printPurchasing(){
    const purchasingData: any = await this.inventoryApi.getPurchasing(sessionStorage.getItem('inventory_purchasing_id'));
    const purchasingItemListData: any = await this.inventoryApi.getPurchasingItemList();
    
    var purchasingBody = [
      ['Purchasing ID', ':', this.formatId.formatId(purchasingData.data().purchasing_code, 5, "#", "PC")],
      ['Purchasing Date', ':', purchasingData.data().purchasing_date],
      ['Supplier ID', ':', this.formatId.formatId(purchasingData.data().supplier.data.supplier_code, 4, "#", "SU")],
      ['Supplier Name', ':', purchasingData.data().supplier.data.supplier_name],
      ['Purchasing Status', ':', purchasingData.data().purchasing_status],
      ['Delivery Date', ':', purchasingData.data().delivery_date],
      ['Received By', ':', purchasingData.data().received_by?.data?.full_name],
    ]

    var purchasingItemListBody = [['No.', 'Stock Item', 'Unit Price', 'Quantity', 'Total Price']];

    for (let data of purchasingItemListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.item_number);
      row.push(rowData.stock_item.data.item_name);
      row.push(rowData.stock_item.data.unit_price);
      row.push(rowData.quantity);
      row.push(rowData.stock_item.data.unit_price * rowData.quantity);
      purchasingItemListBody.push(row);
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
                body: purchasingBody
              }
            }
          ],
          []
        ]
      },
      { text: 'Purchasing Items', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['10%', '35%', '20%', '15%', '20%'],
          body: purchasingItemListBody
        }
      }
    ]

    var header = 'Murger Han Hub - Purchasing';
    this.printPdf.openPdf(header, content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

}
