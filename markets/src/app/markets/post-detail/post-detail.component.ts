import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../models/post';
import { User } from '../../models/user';

import { HttpService } from '../../services';
import { UserService } from '../../services';
import { nextContext } from '@angular/core/src/render3';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  posts: Post[] = [];
  searchEngine: string = '';
  userID;
  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('userID') === null) {
      this.router.navigateByUrl('/');
    } else {
      this.userID = localStorage.getItem('userID');
    }
    this.httpService.getPosts().subscribe(posts => {
      console.log('posts from observable', posts);
      this.posts = posts;
    });
  }
  onDelete(id: number) {
    console.log('deleting post');
    this.httpService.deletePost(id).subscribe(deletedPost => {
      this.posts = this.posts.filter(post => post._id !== deletedPost._id);
    });
  }
}
