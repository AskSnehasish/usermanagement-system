import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services/authentication.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  mobileQuery: MediaQueryList;
  navData = [{ nav: [{ text: 'Profile Update', router: '/profile' }, { text: 'List Users', router: '/list-users' }], role: 'admin' }, { nav: [{ text: 'Profile Update', router: '/profile' }], role: 'user' }];
  fillerNav = this.navData.find(u => u.role == JSON.parse(localStorage.getItem("currentUser")).role).nav;
  private _mobileQueryListener: () => void;
  type: any;
  data: any;

  // Form control defination
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  webUrl = new FormControl('', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]);
  phone = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10),]);
  address = new FormControl('', [Validators.required]);
  dob = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService, private authService: AuthenticationService, private title: Title) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.title.setTitle("Edit user details")
  }

  addForm: FormGroup;

  // Gender List for populating the dropdown
  genders = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' }
  ];

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("dataToEdit"));
    this.type = this.data.type;
    this.addForm = this.formBuilder.group({
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(20)]),
      webUrl: new FormControl(this.data.webUrl, [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]),
      phone: new FormControl(this.data.phone, [Validators.required, Validators.maxLength(10), Validators.minLength(10),]),
      address: new FormControl(this.data.address, [Validators.required]),
      dob: new FormControl(this.data.dob, [Validators.required]),
      gender: new FormControl(this.data.gender, [Validators.required]),
    })
  }



  onSubmit() {
    this.userService.updateUser(this.addForm.value).then(() => {
      localStorage.removeItem("dataToEdit");
      if (this.data.type === "adminUpdate") {
        this.router.navigate(['list-users']);
      } else {
        let newData = this.addForm.value; // Keeping the updated data in a temporary variable
        newData.token = this.data.token; // Adding the JWT token to the temporary variable
        newData.role = this.data.role; // Adding the user role to the temporary variable
        localStorage.removeItem('currentUser'); // Removing the user data from local storage
        localStorage.setItem('currentUser', JSON.stringify(newData)); // Setting the currentUser value in the local storage to the temporary variable
        this.router.navigate(['profile']);
      }
    });
  }

  onBack() {
    localStorage.removeItem('dataToEdit');
    if (this.type == "adminUpdate") { // Checking with the Flag "adminUpdate" for the edit option in the user list view
      this.router.navigate(['list-users']);
    } else {
      this.router.navigate(['profile']);
    }
  }
  onLogOut() {
    this.authService.logout();
  }
}