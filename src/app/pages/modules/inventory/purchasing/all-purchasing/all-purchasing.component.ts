import { Component, ViewChild } from '@angular/core';
import { NewPurchasingComponent } from '../new-purchasing/new-purchasing.component';

@Component({
  selector: 'app-all-purchasing',
  templateUrl: './all-purchasing.component.html',
  styleUrls: ['./all-purchasing.component.scss']
})
export class AllPurchasingComponent {

  @ViewChild('newPurchasingComponentReference', { read: NewPurchasingComponent, static: false }) newPurchasing!: NewPurchasingComponent;

}
