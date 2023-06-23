import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-maintenance-issue-form',
  templateUrl: './maintenance-issue-form.component.html',
  styleUrls: ['./maintenance-issue-form.component.scss']
})
export class MaintenanceIssueFormComponent {

  @Output() openSystemWindow = new EventEmitter<any>();
  @Output() openUserRoleWindow = new EventEmitter<any>();

  issueForm = new FormGroup({
    issueCode: new FormControl(''),
    issueSubject: new FormControl(''),
    issueType: new FormControl(''),
    issueDate: new FormControl(),
    systemCode: new FormControl({value: '', disabled: true}),
    systemName: new FormControl({value: '', disabled: true}),
    reportedTo: new FormControl({value: '', disabled: true}),
    description: new FormControl(''),
    issueStatus: new FormControl(''),
    comments: new FormControl(''),
  })
  
}
