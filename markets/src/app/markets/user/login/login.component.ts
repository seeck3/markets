import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models';
import { UserService } from '../../../services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errors: string[] = [];
  user = new User();
  private userID;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    console.log('from login page', localStorage.getItem('userID'));
    if (localStorage.getItem('userID') !== 'undefined') {
    } else {
      this.userID = localStorage.getItem('userID');
    }
  }

  onSubmit(user: User) {
    this.userService.login(user).subscribe(
      data => {
        localStorage.setItem('userID', data._id);
        this.router.navigateByUrl('markets');
      },
      error => {
        console.log('an error', error);

        this.handleErrors(error.error);
      }
    );
  }

  private handleErrors(errors: string[] | Error | string): void {
    if (Array.isArray(errors)) {
      this.errors = errors;
    } else {
      this.errors = [typeof errors === 'string' ? errors : errors.message];
    }
  }
}
