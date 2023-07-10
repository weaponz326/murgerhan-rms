import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-category-form',
  templateUrl: './item-category-form.component.html',
  styleUrls: ['./item-category-form.component.scss']
})
export class ItemCategoryFormComponent {

  isSaved = false;
  
  categoryForm = new FormGroup({
    categoryCode: new FormControl({value: '', disabled: true}),
    categoryName: new FormControl('', Validators.required),
    description: new FormControl(''),
  })
  
}
