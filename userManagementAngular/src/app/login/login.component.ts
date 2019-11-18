import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../_services/authentication.service";
import { Router } from "@angular/router";
import { sha256 } from "js-sha256";
import { UserService } from "../_services/user.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  message: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private userService: UserService, private title: Title) {
    this.title.setTitle("User Login"); // Sets the page title to the provided string
  }

  addForm: FormGroup;

  // Form control defination
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  ngOnInit() {
    if (this.authService.currentUser != null)
      this.router.navigate(['profile']);
    this.addForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (!this.addForm.invalid) { // Checks if the form data passes all the validation or not.
      this.authService.login({ username: this.addForm.value.email, password: sha256(this.addForm.value.password) }).then((response) => {
        if (!JSON.parse(JSON.stringify(response)).loggedIn && JSON.parse(JSON.stringify(response)).loggedIn != undefined) { // Checked if the user has logged in previously
          this.message = JSON.parse(JSON.stringify(response)).message;
        } else {
          this.router.navigate(['profile']); // Redirects to profile page if the user has not logged out previously.
        }
      });
    }
  }
}

export interface UserData {
  firstName: string;
  role: string
}