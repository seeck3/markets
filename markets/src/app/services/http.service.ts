import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // private readonly base = 'http://59498bce6d49df0011102cfc.mockapi.io/books';
  private readonly base = '/api/markets';
  constructor(private readonly http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.base);
  }
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.base}/${id}`);
  }
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.base}/new`, post);
  }
  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.base}/${id}`);
  }
  contactPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.base}/${id}/contact`);
  }
  loggedIn(): Observable<User> {
    return this.http.get<User>(`${this.base}/loggedin`);
    // .map((response: Response) => response.json())
    // .toPromise();
  }
}
