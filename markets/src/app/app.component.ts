import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedUser = localStorage.getItem('userID');
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  // ngOnInit() {
  //   console.log('123123123123123123', this.loggedUser);
  //   localStorage.getItem('userID');
  // }
  // onLogout() {
  //   this.userService.logout().subscribe(() => {
  //     localStorage.clear();
  //     this.router.navigateByUrl('/');
  //   });
  // }
}
