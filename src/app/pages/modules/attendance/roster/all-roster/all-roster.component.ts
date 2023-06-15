import { Component, ViewChild } from '@angular/core';
import { NewRosterComponent } from '../new-roster/new-roster.component';

@Component({
  selector: 'app-all-roster',
  templateUrl: './all-roster.component.html',
  styleUrls: ['./all-roster.component.scss']
})
export class AllRosterComponent {

  @ViewChild('newRosterComponentReference', { read: NewRosterComponent, static: false }) newRoster!: NewRosterComponent;

}
