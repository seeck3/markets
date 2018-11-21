import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userID;
  constructor(
    private readonly userSerivce: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    console.log('from user componenet', localStorage.getItem('userID'));
    if (localStorage.getItem('userID')) {
      this.router.navigateByUrl('markets');
    }
  }
}
