import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-purchasing-item',
  templateUrl: './edit-purchasing-item.component.html',
  styleUrls: ['./edit-purchasing-item.component.scss']
})
export class EditPurchasingItemComponent {

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  openModal(){
    this.editButton.nativeElement.click();
  }
  
}
