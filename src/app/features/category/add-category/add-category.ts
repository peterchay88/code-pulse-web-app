import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCategoryRequest } from '../models/category.models';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {

  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'success'){
        console.log('Category added successfully');
        this.categoryService.addCategoryStatus.set('idle');
        // Redirect back to category list page
        this.router.navigate(['/admin', 'categories']);
      }

      if (this.categoryService.addCategoryStatus() === 'error'){
        console.log('Failed to add category');
      }
    })

  }

  private categoryService = inject(CategoryService);

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
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormValue.name,
      urlHandle: addCategoryFormValue.urlHandle
    };

    this.categoryService.addCategory(addCategoryRequestDto);

  }

}
