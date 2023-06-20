import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-maintenance-issue-form',
  templateUrl: './maintenance-issue-form.component.html',
  styleUrls: ['./maintenance-issue-form.component.scss']
})
export class MaintenanceIssueFormComponent {

  issueForm = new FormGroup({
    issueCode: new FormControl(''),
    issueSubject: new FormControl(''),
    issueType: new FormControl(''),
    issueDate: new FormControl(),
    system: new FormControl(''),
    reportedTo: new FormControl(''),
    description: new FormControl(''),
    issueStatus: new FormControl(''),
    comments: new FormControl(''),
  })
  
}
