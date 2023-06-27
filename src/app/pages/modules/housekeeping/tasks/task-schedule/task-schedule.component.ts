import { formatDate } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-task-schedule',
  templateUrl: './task-schedule.component.html',
  styleUrls: ['./task-schedule.component.scss']
})
export class TaskScheduleComponent {

  currentMonth!: Date;
  days!: Date[][];
  currentQuarter!: Date;
  weeks!: string[];
  currentYear!: number;
  months!: string[];

  displayedMonth: any;
  displayedYear: any;
  displayedQuarter: any;

  ngOnInit() {
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.currentMonth = new Date();
    this.generateCalendar();
    this.currentQuarter = new Date();
    this.getCurrentQuarter();
    this.weeks = this.generateWeeks();
    this.currentYear = new Date().getFullYear();
  }

  // month

  previousMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  selectDay(day: any){
    console.log(day);
  }

  generateCalendar() {
    console.log(this.currentMonth)
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    this.displayedYear = year;
    this.displayedMonth = this.months[month];

    this.days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();

    let start = 1;
    let end = 7 - firstDayOfMonth.getDay();

    while (start <= numDaysInMonth) {
      const week: Date[] = [];

      for (let i = start; i <= end; i++) {
        const day = new Date(year, month, i);
        week.push(day);
      }

      this.days.push(week);

      start = end + 1;
      end = start + 6;
      if (end > numDaysInMonth) {
        end = numDaysInMonth;
      }
    }
  }

  // quarter

  previousQuarter() {
    const currentQuarter = new Date(this.currentQuarter);
    currentQuarter.setMonth(currentQuarter.getMonth() - 3);
    this.currentQuarter = currentQuarter;
    this.weeks = this.generateWeeks();
    this.getCurrentQuarter();
  }

  nextQuarter() {
    const currentQuarter = new Date(this.currentQuarter);
    currentQuarter.setMonth(currentQuarter.getMonth() + 3);
    this.currentQuarter = currentQuarter;
    this.weeks = this.generateWeeks();
    this.getCurrentQuarter();
  }

  selectWeek(week: string) {
    console.log(week);
  }

  getCurrentQuarter() {
    // const today = new Date();
    const year = this.currentQuarter.getFullYear();
    const month = this.currentQuarter.getMonth() + 1;
    let quarter: string;
  
    if (month >= 1 && month <= 3) {
      quarter = 'Quarter 1';
    } else if (month >= 4 && month <= 6) {
      quarter = 'Quarter 2';
    } else if (month >= 7 && month <= 9) {
      quarter = 'Quarter 3';
    } else {
      quarter = 'Quarter 4';
    }
  
    this.displayedQuarter = quarter + ", " + year
  }

  private generateWeeks(): string[] {
    const weeks: string[] = [];
    const quarterStart = new Date(this.currentQuarter.getFullYear(), this.currentQuarter.getMonth(), 1);
    const quarterEnd = new Date(quarterStart.getFullYear(), quarterStart.getMonth() + 3, 0);

    let currentWeekStart = new Date(quarterStart);
    while (currentWeekStart < quarterEnd) {
      const currentWeekEnd = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + 6);
      const weekLabel = this.formatWeekLabel(currentWeekStart, currentWeekEnd);
      weeks.push(weekLabel);
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    return weeks;
  }

  private formatWeekLabel(start: Date, end: Date): string {
    const formattedStart = formatDate(start, 'dd MMM', 'en');
    const formattedEnd = formatDate(end, 'dd MMM', 'en');
    const year = start.getFullYear();
    return `${formattedStart} - ${formattedEnd}, ${year}`;
  }

  // year

  previousYear() {
    this.currentYear--;
  }

  nextYear() {
    this.currentYear++;
  }

  selectMonth(month: string) {
    console.log(month);
  }

}
