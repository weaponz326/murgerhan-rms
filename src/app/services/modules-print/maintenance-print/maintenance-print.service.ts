import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';


@Injectable({
  providedIn: 'root'
})
export class MaintenancePrintService {

  constructor(
    private printPdf: PrintPdfService,
    private formatId: FormatIdService
  ) { }

  // print issues

  printIssuesReport(issueListData: any, metricsData: any, dates: any){

    var metricsBody = [
      ['No. of Issues', ':', metricsData.numberOfIssues],
      ['Issues - Needs Fixing', ':', metricsData.issuesNeedsFixing],
    ]

    var tableBody = [['Issue ID', 'Issue Subject', 'Issue Date', 'System Name']];

    for (let data of issueListData){
      var row = [];
      let rowData: any = data.data();
      row.push(this.formatId.formatId(rowData.issue_code, 5, "#", "UE"));
      row.push(rowData.issue_subject);
      row.push(rowData.issue_date);
      row.push(rowData.system.data.system_name);
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
          widths: ['15%', '40%', '20%', '25%'],
          body: tableBody
        }
      }
    ]

    var header = 'Murger Han Hub - Issues Report';
    this.printPdf.openPdf(header, content);
  }

  // print services

  printServicesReport(serviceListData: any, metricsData: any, dates: any){

    var metricsBody = [
      ['No. of Services', ':', metricsData.numberOfServices],
      ['Ongoing Services', ':', metricsData.ongoingServices],
      ['Total Services Cost', ':', metricsData.totalServicesCost],
    ]

    var tableBody = [['Service ID', 'Service Subject', 'Date From', 'Date To', 'System Name']];

    for (let data of serviceListData){
      var row = [];
      let rowData: any = data.data();
      row.push(this.formatId.formatId(rowData.service_code, 5, "#", "SE"));
      row.push(rowData.service_subject);
      row.push(rowData.date_from);
      row.push(rowData.date_to);
      row.push(rowData.system.data.system_name);
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
          widths: ['15%', '35%', '15%', '15%', '20%'],
          body: tableBody
        }
      }
    ]

    var header = 'Murger Han Hub - Services Report';
    this.printPdf.openPdf(header, content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

}
