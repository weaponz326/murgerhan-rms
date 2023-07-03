import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { SelectBranchComponent } from 'src/app/components/select-windows/admin-windows/select-branch/select-branch.component';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(private datePipe: DatePipe) {}
  
  @Input() modules: string[] = []
  @Output() moduleEvent = new EventEmitter<any>();
  @Output() startDateEvent = new EventEmitter<any>();
  @Output() endDateEvent = new EventEmitter<any>();

  @ViewChild('selectBranchComponentReference', { read: SelectBranchComponent, static: false }) selectBranch!: SelectBranchComponent;

  selectedBranch = "";
  selectedModule = "";
  selectedRange = "";
  selectedDay = "";

  selectedDays: any[] = [];
  startDay: any;
  endDay: any;

  isModuleDisabled = true;
  isRangeDisabled = true;
  isDaysDisabled = true;

  openBranchWindow(){
    console.log("You are opening select branch window")
    this.selectBranch.openModal();
  }

  onBranchSelected(branchData: any){
    console.log(branchData);
    this.selectedBranch = branchData.data().branch_name;
    
    let data = {
      id: branchData.id,
      data: {
        branch_name: branchData.data().branch_name,
        location: branchData.data().location,
      }
    }
    localStorage.setItem("selected_branch", JSON.stringify(data));

    this.isModuleDisabled = false;
    this.selectedModule = "";
    this.selectedRange = "";
    this.selectedDay = "";
  }

  onModuleChange(){
    console.log(this.selectedModule);
    this.moduleEvent.emit(this.selectedModule);
    this.isRangeDisabled = false;
    this.selectedRange = "";
    this.selectedDay = "";
  }

  onRangeChange(){
    console.log(this.selectedRange);
    this.isDaysDisabled = false;
    this.selectedDay = "";

    switch (this.selectedRange) {
      case 'days':
        this.generateDays();
        break;
      case 'weeks':
        this.generateWeeks();
        break;
      case 'months':
        this.generateMonths();
        break;
      case 'quarters':
        this.generateQuarters();
        break;
      case 'years':
        this.generateYears();
        break;
      default:
        this.selectedDays = []; // Reset selectedValues if no option is selected
        break;
    }
  }

  onDaysChange(){
    const { startDate, endDate } = this.parseDateRange(this.selectedDay);
    this.startDay = startDate;
    this.endDay = endDate;
    console.log(this.startDay, this.endDay)

    this.startDateEvent.emit(this.startDay);
    this.endDateEvent.emit(this.endDay);    
  }

  // generate days functions

  generateDays() {
    const currentDate = new Date();
    const firstDayOfYear = new Date(2023, 0, 1);
    const lastDay = currentDate;
  
    const days: any = [];
    for (let date = new Date(firstDayOfYear); date <= lastDay; date.setDate(date.getDate() + 1)) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      days.push(
        `${this.datePipe.transform(startDate, 'yyyy-MM-dd')} to ${this.datePipe.transform(endDate, 'yyyy-MM-dd')}`
      );
    }
    this.selectedDays = days;
  }
  
  generateWeeks() {
    const currentDate = new Date();
    const firstDayOfYear = new Date(2023, 0, 1);
    const lastDay = currentDate;
  
    const weeks: any = [];
    for (let date = new Date(firstDayOfYear); date <= lastDay; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) {
        // Sunday - start of a week
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(date.getDate() + 6);
        weeks.push(
          `${this.datePipe.transform(startDate, 'yyyy-MM-dd')} to ${this.datePipe.transform(endDate, 'yyyy-MM-dd')}`
        );
      }
    }
  
    this.selectedDays = weeks;
  }
  
  generateMonths() {
    const currentDate = new Date();
    const firstMonth = 0; // January
    const lastMonth = currentDate.getMonth();
  
    const months = [];
    for (let month = firstMonth; month <= lastMonth; month++) {
      const firstDayOfMonth = new Date(2023, month, 1);
      const lastDayOfMonth = new Date(2023, month + 1, 0);
      months.push(
        `${this.datePipe.transform(firstDayOfMonth, 'yyyy-MM-dd')} to ${this.datePipe.transform(lastDayOfMonth, 'yyyy-MM-dd')}`
      );
    }
    this.selectedDays = months;
  }
  
  generateQuarters() {
    const currentDate = new Date();
    const firstQuarter = Math.floor(currentDate.getMonth() / 3);
    const lastQuarter = Math.floor((currentDate.getMonth() + 3) / 3) - 1;
  
    const quarters: any = [];
    for (let quarter = firstQuarter; quarter <= lastQuarter; quarter++) {
      const firstMonthOfQuarter = quarter * 3;
      const lastMonthOfQuarter = firstMonthOfQuarter + 2;
      const firstDayOfQuarter = new Date(2023, firstMonthOfQuarter, 1);
      const lastDayOfQuarter = new Date(2023, lastMonthOfQuarter + 1, 0);
      quarters.push(
        `${this.datePipe.transform(firstDayOfQuarter, 'yyyy-MM-dd')} to ${this.datePipe.transform(lastDayOfQuarter, 'yyyy-MM-dd')}`
      );
    }
    this.selectedDays = quarters;
  }
  
  generateYears() {
    const currentDate = new Date();
    const firstYear = 2023;
    const lastYear = currentDate.getFullYear();
  
    const years = [];
    for (let year = firstYear; year <= lastYear; year++) {
      const firstDayOfYear = new Date(year, 0, 1);
      const lastDayOfYear = new Date(year, 11, 31);
      years.push(
        `${this.datePipe.transform(firstDayOfYear, 'yyyy-MM-dd')} to ${this.datePipe.transform(lastDayOfYear, 'yyyy-MM-dd')}`
      );
    }
    this.selectedDays = years;
  }
  
  parseDateRange(dateRange: string) {
    const [startDateStr, endDateStr] = dateRange.split(" to ");
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    return { startDate, endDate };
  }

}
