import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { AddCategoryRequest, Category } from '../models/category.models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:5026';

  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

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

  getAllCategories(){
    const response = httpResource<Category[]>(() => `${this.apiBaseUrl}/api/categories`)
    return response;
  }

}
