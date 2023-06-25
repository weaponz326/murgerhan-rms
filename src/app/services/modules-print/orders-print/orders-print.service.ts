import { Injectable } from '@angular/core';

import { OrdersApiService } from '../../modules-api/orders-api/orders-api.service';
import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersPrintService {

  constructor(
    private ordersApi: OrdersApiService,
    private printPdf: PrintPdfService
  ) { }

  // print all products

  async printProductList(){
    const productListData: any = await this.ordersApi.getProductList();

    var body = [['Product ID', 'Product Name', 'Price']];

    for (let data of productListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.product_code);
      row.push(rowData.product_name);
      row.push(rowData.price);
      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['25%', '50%', '25%'],
          body: body
        }
      }
    ]

    var header = 'Murger Han Hub - All Products';
    this.printPdf.openPdf(header, content);
  }

  // print product

  async printProduct(){
    const productData: any = await this.ordersApi.getProduct(sessionStorage.getItem('orders_product_id'));
    
    var productBody = [
      ['Product ID', ':', productData.data().product_code],
      ['Product Name', ':', productData.data().product_name],
      ['Price', ':', productData.data().price],
      ['Product Tpye', ':', productData.data().product_type],
      ['Description', ':', productData.data().description],
    ]

    let content = [
      {
        columns: [
          [
            {
              layout: 'noBorders',
              table: {
                headerRows: 0,
                widths: ['33%', '2%', '65%'],
                body: productBody
              }
            }
          ],
          []
        ]
      },
    ]

    var header = 'Murger Han Hub - View Product';
    this.printPdf.openPdf(header, content);
  }

  // print all orders

  async printOrderList(){
    const orderListData: any = await this.ordersApi.getOrderList(250, 1, {}, {});

    var body = [['Order ID', 'Order Date', 'Vendor', 'Total Price']];

    for (let data of orderListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.order_code);
      row.push(rowData.order_date);
      row.push(rowData.vendor.data.vendor_name);
      row.push(rowData.total_price);
      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '25%', '40%', '20%'],
          body: body
        }
      }
    ]

    var header = 'Murger Han Hub - All Orders';
    this.printPdf.openPdf(header, content);
  }

  // print order

  async printOrder(){
    const orderData: any = await this.ordersApi.getOrder(sessionStorage.getItem('orders_order_id'));
    const orderItemListData: any = await this.ordersApi.getOrderItemList();
    
    var orderBody = [
      ['Order ID', ':', orderData.data().order_code],
      ['Order Date', ':', orderData.data().order_date],
      ['Vendor ID', ':', orderData.data().vendor.data.vendor_code],
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
      { text: 'Order Items', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['10%', '35%', '20%', '15%', '20%'],
          body: orderItemListBody
        }
      }
    ]

    var header = 'Murger Han Hub - View Order';
    this.printPdf.openPdf(header, content);
  }

  // print all vendors

  async printVendorList(){
    const vendorListData: any = await this.ordersApi.getVendorList(250, 1, {}, {});

    var body = [['Vendor ID', 'Vendor Name', 'Phone No.', 'Email']];

    for (let data of vendorListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.vendor_code);
      row.push(rowData.vendor_name);
      row.push(rowData.phone);
      row.push(rowData.email);
      body.push(row);
    }

    let content = [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['15%', '40%', '20%', '25%'],
          body: body
        }
      }
    ]

    var header = 'Murger Han Hub - All Vendors';
    this.printPdf.openPdf(header, content);
  }

  // print vendor

  async printVendor(){
    const vendorData: any = await this.ordersApi.getVendor(sessionStorage.getItem('orders_vendor_id'));
    const vendorItemListData: any = await this.ordersApi.getVendorProductList();
    
    var vendorBody = [
      ['Vendor ID', ':', vendorData.data().vendor_code],
      ['Vendor Name', ':', vendorData.data().vendor_name],
      ['Phone No.', ':', vendorData.data().phone],
      ['Email', ':', vendorData.data().email],
      ['Address', ':', vendorData.data().address],
    ]

    var vendorProductListBody = [['Product ID', 'Product Name', 'Price']];

    for (let data of vendorItemListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.product.data.product_code);
      row.push(rowData.product.data.product_name);
      row.push(rowData.product.data.price);
      vendorProductListBody.push(row);
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
                body: vendorBody
              }
            }
          ],
        ]
      },
      { text: 'Vendor Products', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['20%', '50%', '30%'],
          body: vendorProductListBody
        }
      }
    ]

    var header = 'Murger Han Hub - View Vendor';
    this.printPdf.openPdf(header, content);
  }

}
