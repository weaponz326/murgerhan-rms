import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';
import { AttendanceApiService } from '../../modules-api/attendance-api/attendance-api.service';


@Injectable({
  providedIn: 'root'
})
export class AttendancePrintService {

  constructor(
    private attendanceApi: AttendanceApiService,
    private printPdf: PrintPdfService,
    private formatId: FormatIdService
  ) { }

  sheetDates: any[] = [];

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
    this.printPdf.openPdf(content);
  }

  // print roster

  async printRoster(){
    const rosterData: any = await this.attendanceApi.getRoster(sessionStorage.getItem('attendance_roster_id'));
    const rosterShiftListData: any = await this.attendanceApi.getRosterShiftList();
    
    var rosterBody = [
      ['Roster ID', ':', this.formatId.formatId(rosterData.data().roster_code, 3, "#", "RT")],
      ['Roster Name', ':', rosterData.data().roster_name],
      ['From Date', ':', rosterData.data().from_date],
      ['To Date', ':', rosterData.data().to_date],
    ]

    var shiftItemListBody = [['Shift Name', 'Start Time', 'End Time']];

    for (let data of rosterShiftListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.shift_name);
      row.push(rowData.start_time);
      row.push(rowData.end_time);
      shiftItemListBody.push(row);
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
                body: rosterBody
              }
            }
          ],
          [ ]
        ]
      },
      { text: 'Roster Shifts', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['50%', '25%', '25%'],
          body: shiftItemListBody
        }
      }
    ]

    var header = 'Murger Han Hub - Roster';
    this.printPdf.openPdf(content);
  }

  // roster sheet

  async printRosterSheet(){
    const rosterData: any = await this.attendanceApi.getRoster(sessionStorage.getItem('attendance_roster_id'));
    const rosterShiftListData: any = await this.attendanceApi.getRosterShiftList();
    const rosterSheetListData: any = await this.attendanceApi.getRosterSheetList();

    let sheetDates: any = [];
    sheetDates = this.getDateRange(new Date(rosterData.data().from_date), new Date(rosterData.data().to_date));

    // Define your table structure in pdfmake format
    const tableBody = [];

    // Loop through rosterShiftListData to populate table rows
    for (const shift of rosterShiftListData.docs) {
        const row = [shift.data().shift_name];

        // Loop through sheetDates to populate each cell
        for (const date of sheetDates) {
            const cellContent = [];
            
            for (const sheetData of rosterSheetListData) {
                if (sheetData.data().shift === shift.id && sheetData.data().date === this.dateFormat(date)) {
                    cellContent.push(sheetData.data().batch.data.batch_symbol);
                }
            }

            const cell = {
                text: cellContent.join('\n'),
                alignment: 'center',
                fillColor: '#f0f0f0', // Add your desired background color
                border: [false, false, false, true], // Add borders as needed
                margin: [2, 2]
            };
            
            row.push(cell);
        }

        tableBody.push(row);
    }

    // Define the table structure
    const table = {
        layout: 'lightHorizontalLines',
        table: {
            headerRows: 1,
            widths: ['*', ...Array(sheetDates.length).fill('auto')],
            body: [
                ['Shifts', ...sheetDates.map((date: any) => this.dateFormat(date))], // Replace formatDate with your date formatting function
                ...tableBody
            ]
        }
    };

    var header = 'Murger Han Hub - Roster Sheet';
    this.printPdf.openPortraitPdf(table);
  }

  // roster batches

  async printRosterBatches(){
    const rosterData: any = await this.attendanceApi.getRoster(sessionStorage.getItem('attendance_roster_id'));
    const rosterBatchListData: any = await this.attendanceApi.getRosterBatchList();
    const rosterPersonnelListData: any = await this.attendanceApi.getRosterPersonnelList();
    
    var rosterBody = [
      ['Roster ID', ':', this.formatId.formatId(rosterData.data().roster_code, 3, "#", "RT")],
      ['Roster Name', ':', rosterData.data().roster_name],
    ]

    var batchListBody = [['Batch Name', 'Batch Symbol']];

    for (let data of rosterBatchListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.batch_name);
      row.push(rowData.batch_symbol);
      batchListBody.push(row);
    }

    var personnelListBody = [['Personnel ID', 'Personnel Name', 'Batch']];

    for (let data of rosterPersonnelListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.peresonnel.data.staff_code);
      row.push(rowData.peresonnel.data.full_name);
      row.push(rowData.batch.data.batch_symbol);
      personnelListBody.push(row);
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
                body: rosterBody
              }
            }
          ],
          [ ]
        ]
      },
      { text: 'Roster Batches', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['70%', '30%'],
          body: batchListBody
        }
      },
      { text: 'Roster Personnel', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['30%', '50%', '20%'],
          body: personnelListBody
        }
      }
    ]

    var header = 'Murger Han Hub - Roster Batches';
    this.printPdf.openPdf(content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

  getDateRange(startDate: Date, endDate: Date) {
    let sheetDates: any = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      this.sheetDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return sheetDates
  }

}
