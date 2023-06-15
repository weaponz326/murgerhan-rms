import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-purchasing-item',
  templateUrl: './add-purchasing-item.component.html',
  styleUrls: ['./add-purchasing-item.component.scss']
})
export class AddPurchasingItemComponent {

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  openModal(){
    this.addButton.nativeElement.click();
  }
  
}
