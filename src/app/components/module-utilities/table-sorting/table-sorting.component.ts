import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.scss']
})
export class TableSortingComponent {

  @Input() fieldTitle: string = "";
  @Input() sortField: string = "";
  @Input() currentField: string = "";
  @Output() sortDirection = new EventEmitter<string>();

  ngOnInit(): void {
  }

  setSort(direction: any){
    this.sortDirection.emit(direction);

    console.log(this.currentField)
  }  
  
}
