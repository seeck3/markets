import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loggedUser = localStorage.getItem('userID');
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    // console.log('123123123123123123', this.loggedUser);
    // localStorage.getItem('userID');
  }
  onLogout() {
    this.userService.logout().subscribe(() => {
      localStorage.clear();
      this.router.navigateByUrl('/');
    });
  }
}
