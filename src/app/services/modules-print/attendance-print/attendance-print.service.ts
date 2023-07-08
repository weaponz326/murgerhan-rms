import { Injectable } from '@angular/core';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AttendancePrintService {

  constructor(
    private printPdf: PrintPdfService
  ) { }

  // print attendance

  printAttendanceReport(metricsData: any, dates: any){

    var metricsBody = [
      ['Number Present', ':', metricsData.numberPresent],
      ['Number Absent', ':', metricsData.numberAbsent],
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
                body: metricsBody
              }
            }
          ],
          [
            { text: "From  " + this.dateFormat(dates.startDate) + " , " + "To  " + this.dateFormat(dates.endDate) },
          ]
        ]
      }
    ]

    var header = 'Murger Han Hub - Attendance Report';
    this.printPdf.openPdf(header, content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

}
