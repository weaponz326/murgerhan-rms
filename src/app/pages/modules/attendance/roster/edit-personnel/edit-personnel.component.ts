import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['./edit-personnel.component.scss']
})
export class EditPersonnelComponent {

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismssButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  openModal(data: any){
    this.editButton.nativeElement.click();
  }

}
