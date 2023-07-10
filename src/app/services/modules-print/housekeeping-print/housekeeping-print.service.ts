import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';


@Injectable({
  providedIn: 'root'
})
export class HousekeepingPrintService {

  constructor(
    private printPdf: PrintPdfService,
    public formatId: FormatIdService
  ) { }

  // print tasks

  printTasksReport(orderListData: any, metricsData: any, dates: any){

    var metricsBody = [
      ['No. of Tasks', ':', metricsData.numberOfTasks],
      ['Tasks - To Do', ':', metricsData.todoTasks],
    ]

    var tableBody = [['Task ID', 'Task Name', 'From Date', 'To Date', 'Task Type', 'Task Status']];

    for (let data of orderListData){
      var row = [];
      let rowData: any = data.data();
      row.push(this.formatId.formatId(rowData.task_code, 5, "#", "TK"));
      row.push(rowData.task_name);
      row.push(rowData.from_date);
      row.push(rowData.to_date);
      row.push(rowData.task_type);
      row.push(rowData.task_status);
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
          widths: ['10%', '26%', '12%', '12%', '15%', '15%'],
          body: tableBody
        }
      }
    ]

    var header = 'Murger Han Hub - Tasks Report';
    this.printPdf.openPdf(header, content);
  }

  // print incidents

  printIncidentsReport(orderListData: any, metricsData: any, dates: any){

    var metricsBody = [
      ['No. of Incidents', ':', metricsData.numberOfIncidents],
      ['Unresolved Incidents', ':', metricsData.unresolvedIncidents],
    ]

    var tableBody = [['Incident ID', 'Incident Subject', 'Incident Date', 'Incident Status']];

    for (let data of orderListData){
      var row = [];
      let rowData: any = data.data();
      row.push(this.formatId.formatId(rowData.incident_code, 5, "#", "NC"));
      row.push(rowData.incident_subject);
      row.push(rowData.incident_date);
      row.push(rowData.incident_status);
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
          widths: ['15%', '45%', '20%', '20%'],
          body: tableBody
        }
      }
    ]

    var header = 'Murger Han Hub - Incidents Report';
    this.printPdf.openPdf(header, content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

}
