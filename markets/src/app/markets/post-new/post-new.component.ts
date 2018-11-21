import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Post } from '../../models/post';

import { HttpService } from '../../services';
import { UserService } from '../../services';
@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
})
export class PostNewComponent implements OnInit {
  selectedFile: File = null;
  post = new Post();
  hasImage: boolean = false;

  @Output()
  createPost = new EventEmitter<Post>();
  private userID;
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit() {
    console.log('from new post component', localStorage.getItem('userID'));

    // if (localStorage.getItem('userID') === 'undefined') {
    // } else {
    //   this.userID = localStorage.getItem('userID');
    // }
    if (localStorage.getItem('userID') === null) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    const loggedInUser = localStorage.getItem('userID');
    console.log('who is logging now?', loggedInUser);
    console.log('submitting form', form.value);

    this.httpService.createPost(form.value).subscribe(
      () => {
        this.createPost.emit(form.value);
        this.post = new Post();
        this.post.users = loggedInUser;
        console.log(this.post.users, 'this user post');
        console.log(this.post, 'this post');
        form.reset();
        this.router.navigateByUrl('markets');
      },

      error => {
        console.log(error);
      }
    );
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:4600/assets', fd).subscribe(response => {
      console.log(response);
    });
  }
  uploadPhoto() {
    this.post.photo = prompt('Please enter photo url');
    if (this.post.photo !== '') {
      this.hasImage = true;
    }
  }
}
