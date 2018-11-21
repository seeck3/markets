import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models';
import { UserService } from '../../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errors: string[] = [];
  user = new User();

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {}
  onSubmit(user: User) {
    this.userService.register(user).subscribe(
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
