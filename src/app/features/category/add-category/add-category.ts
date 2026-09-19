import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true}),
    urlHandle: new FormControl<string>('', {nonNullable: true})
  })

  onSubmit() {
    console.log(this.addCategoryFormGroup.getRawValue());
  }
}
