import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss']
})
export class AddPersonnelComponent {

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismssButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  openModal(){
    this.addButton.nativeElement.click();
  }

}
