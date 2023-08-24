import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';
import { OrdersApiService } from '../../modules-api/orders-api/orders-api.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersPrintService {

  constructor(
    private printPdf: PrintPdfService,
    private formatId: FormatIdService,
    private ordersApi: OrdersApiService
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
      row.push(this.formatId.formatId(rowData.order_code, 5, "#", "RD"));
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
    this.printPdf.openPdf(content);
  }

  // print view order

  async printOrder(){
    const orderData: any = await this.ordersApi.getOrder(sessionStorage.getItem('orders_order_id'));
    const orderItemListData: any = await this.ordersApi.getOrderItemList();
    
    var orderBody = [
      ['Order ID', ':', this.formatId.formatId(orderData.data().order_code, 5, "#", "RD")],
      ['Order Date', ':', orderData.data().order_date],
      ['Vendor ID', ':', this.formatId.formatId(orderData.data().vendor.data.vendor_code, 4, "#", "VE")],
      ['Vendor Name', ':', orderData.data().vendor.data.vendor_name],
      ['Order Status', ':', orderData.data().order_status],
      ['Delivery Date', ':', orderData.data().delivery_date],
    ]

    var orderItemListBody = [['No.', 'Product Name', 'Price', 'Quantity', 'Total Price']];

    for (let data of orderItemListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.item_number);
      row.push(rowData.product.data.product_name);
      row.push(rowData.product.data.price);
      row.push(rowData.quantity);
      row.push(rowData.product.data.price * rowData.quantity);
      orderItemListBody.push(row);
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
                body: orderBody
              }
            }
          ],
          [
            { text: 'OrderTotal', alignment: 'center' },
            { text: '$' + orderData.data().total_price, bold: true, alignment: 'center', margin: [0, 20] }
          ]
        ]
      },
      { text: 'Order Products', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['10%', '35%', '20%', '15%', '20%'],
          body: orderItemListBody
        }
      }
    ]

    var header = 'Murger Han Hub - Order';
    this.printPdf.openPdf(content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

}
