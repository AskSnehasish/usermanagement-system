import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services/authentication.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  mobileQuery: MediaQueryList;
  navData = [{ nav: [{ text: 'Profile Update', router: '/profile' }, { text: 'List Users', router: '/list-users' }], role: 'admin' }, { nav: [{ text: 'Profile Update', router: '/profile' }], role: 'user' }];
  fillerNav = this.navData.find(u => u.role == JSON.parse(localStorage.getItem("currentUser")).role).nav;
  private _mobileQueryListener: () => void;
  userData: any;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private userService: UserService, private authService: AuthenticationService, private title: Title) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.title.setTitle("Profile");  // Sets the page title to the provided string
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("currentUser")); // Gets the user data from the local storage
  }


  onEdit(item) {
    item.type = 'profileUpdate';
    localStorage.setItem("dataToEdit", JSON.stringify(item))
    this.router.navigate(['edit-user']);
  }

  onLogOut() {
    this.authService.logout();
  }

}

