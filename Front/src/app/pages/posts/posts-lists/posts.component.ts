import { Component } from '@angular/core';
import { PostListComponent } from './post-list';
import { PostFormComponent } from '../posts-form/post-form';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [PostListComponent, PostFormComponent],
  template: `
    <div class="p-4 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Gestion des Articles</h1>
      <app-post-form></app-post-form>
      <app-post-list></app-post-list>
    </div>
  `
})
export class PostsComponent {}
