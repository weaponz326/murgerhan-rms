import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-order-item',
  templateUrl: './edit-order-item.component.html',
  styleUrls: ['./edit-order-item.component.scss']
})
export class EditOrderItemComponent {

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  ngOnInit(): void {
  }

  openModal(){
    this.editButton.nativeElement.click();
  }
  
}
