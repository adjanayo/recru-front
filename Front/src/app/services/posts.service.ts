import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../api.config';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  getPosts() {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  createPost(post: Omit<Post, 'id'>) {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }
}
