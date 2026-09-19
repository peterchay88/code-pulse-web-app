import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [
      Validators.required,
      Validators.maxLength(100)
    ]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [
      Validators.required,
      Validators.maxLength(200)
    ]})
  })

  get nameFormControl() {
    return this.addCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl() {
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  onSubmit() {
    console.log(this.addCategoryFormGroup.getRawValue());
  }
}
