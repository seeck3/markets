import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Post } from '../../models/post';
import { User } from '../../models/user';

import { HttpService } from '../../services';
import { UserService } from '../../services';
import { nextContext } from '@angular/core/src/render3';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  contact = { name: '', email: '' };
  searchEngine: string = '';
  userID;
  contactInfo;
  closeResult: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // console.log(localStorage.getItem('userID'));
    // if (localStorage.getItem('userID') === null) {
    //   this.router.navigateByUrl('/');
    // }
    if (localStorage.getItem('userID') === 'undefined') {
    } else {
      this.userID = localStorage.getItem('userID');
    }
    if (localStorage.getItem('userID') === null) {
      this.router.navigateByUrl('/');
    }
    console.log('post-list page', this.userID);

    this.httpService.getPosts().subscribe(posts => {
      console.log('posts from observable', posts);
      this.posts = posts;
    });
  }

// create post
  onCreate(post: Post): void {
    console.log('creating post', post);
    this.httpService.createPost(post).subscribe(createdPost => {
      this.posts = [...this.posts, createdPost];
    });
  }
// show user of selected post
  onContact(id: number) {
    console.log('contact info');
    this.httpService.contactPost(id).subscribe(contactPost => {
      this.contactInfo = contactPost;
      // console.log(contactPost);
    });
  }
  onDelete(id: number) {
    console.log('deleting post');
    this.httpService.deletePost(id).subscribe(deletedPost => {
      this.posts = this.posts.filter(post => post._id !== deletedPost._id);
    });
  }

  // using modal for pop-up contact user info
  open(content) {
    console.log('click click click');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
