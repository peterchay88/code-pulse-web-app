import { Injectable, InputSignal, inject, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { AddCategoryRequest, Category, UpdateCategoryRequest } from '../models/category.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  updateCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  deleteCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  /**
   * Issues a Post request to add a new category
   * @param category 
   */
  addCategory(category: AddCategoryRequest){
    this.addCategoryStatus.set('loading');

    const response = this.http.post<void>(`${this.apiBaseUrl}/api/categories`,category).subscribe({
      next: () => {
        this.addCategoryStatus.set('success');
      },
      error: () => {
        this.addCategoryStatus.set('error');
      }
    });
  }

  /**
   * Issues a Get request to retrieve all categories
   */
  getAllCategories(){
    const response = httpResource<Category[]>(() => `${this.apiBaseUrl}/api/categories`)
    return response;
  }

  /**
   * Issues a Get request to retrieve a category by its ID
   * @param id 
   */
  getCategoryByID(id: InputSignal<string | undefined>){
    const response = httpResource<Category>(() => `${this.apiBaseUrl}/api/categories/${id()}`);
    return response;
  }

  /**
   * Issues a PUT request to update a category by its ID
   * @param id 
   * @param updateCategoryRequest 
   */
  updateCategory(id: InputSignal<string | undefined>, updateCategoryRequest: UpdateCategoryRequest){
    this.updateCategoryStatus.set('loading');
    this.http.put<void>(`${this.apiBaseUrl}/api/categories/${id()}`, updateCategoryRequest)
      .subscribe({
        next: () => {
          this.updateCategoryStatus.set('success');
        },
        error: () => {
          this.updateCategoryStatus.set('error');
        }
    });
  }

  deleteCategory(id: InputSignal<string | undefined>){
    this.deleteCategoryStatus.set('loading');
    this.http.delete<void>(`${this.apiBaseUrl}/api/categories/${id()}`)
      .subscribe({
        next: () => {
          this.deleteCategoryStatus.set('success');
        },
        error: () => {
          this.deleteCategoryStatus.set('error');
        }
      });

  }

}
