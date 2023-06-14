import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.scss']
})
export class AddOrderItemComponent {

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  ngOnInit(): void {
  }

  openModal(){
    this.addButton.nativeElement.click();
  }

}
