import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent {

  @Output() pageSelected = new EventEmitter<any>();
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  
  changePage(event: any, page: any){
    console.log(page);
    event.preventDefault();

    this.pageSelected.emit(page);
  }

}
