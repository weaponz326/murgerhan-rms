import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent {

  @Output() pageSelected = new EventEmitter<any>();
  @Input() currentPageNumber = 0;
  @Input() currentPageSize = 0;
  
  changePage(event: any, page: any){
    event.preventDefault();
    console.log(page);
    this.pageSelected.emit(page);
  }

}
