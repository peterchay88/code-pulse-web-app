import { Component, input, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import type { UpdateCategoryRequest } from '../models/category.models';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {

  constructor(){
    effect(() => {
      if (this.categoryService.updateCategoryStatus() === 'success') {
        console.log(`Category with ID: ${this.id()} updated successfully`);
        this.categoryService.updateCategoryStatus.set('idle');
        this.router.navigate(['admin/categories']);
      }
      if (this.categoryService.updateCategoryStatus() === 'error') {
        console.error(`Failed to update category with ID: ${this.id()}`);
        this.categoryService.updateCategoryStatus.set('idle');
      }

      if (this.categoryService.deleteCategoryStatus() === 'success') {
        console.log(`Category with ID: ${this.id()} deleted successfully`);
        this.categoryService.deleteCategoryStatus.set('idle');
        this.router.navigate(['admin/categories']);
      }
      if (this.categoryService.deleteCategoryStatus() === 'error') {
        console.error(`Failed to delete category with ID: ${this.id()}`);
        this.categoryService.deleteCategoryStatus.set('idle');
      }
    })
  }

  id = input<string>();

  private categoryService = inject(CategoryService);
  private router = inject(Router);

  categoryResourceRef = this.categoryService.getCategoryByID(this.id);
  categoryResponse = this.categoryResourceRef.value;

  editCategoryFormGroup = new FormGroup({
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
    return this.editCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl() {
    return this.editCategoryFormGroup.controls.urlHandle;
  }

  effectReference = effect(() => {
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name ?? '');
    this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle ?? '');
  })

  onSubmit() {
    const id = this.id();

    if (!this.editCategoryFormGroup.valid || !id) {
      return;
    }
    const fromValue= this.editCategoryFormGroup.getRawValue();

    const updateCategoryRequest: UpdateCategoryRequest = {
      name: fromValue.name,
      urlHandle: fromValue.urlHandle
    }


    console.log(`Updating category with ID: ${id}`)
    this.categoryService.updateCategory(this.id, updateCategoryRequest);

  }

  deleteCategory(){
    const id = this.id();
    if (!id) {
      return;
    }
    this.categoryService.deleteCategory(this.id);
  }

}
