import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Title } from '@angular/platform-browser';

//SHA256 for hashing the password
import { sha256 } from "js-sha256";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})


export class AddUserComponent implements OnInit {
  passwordError: boolean;
  emailExists: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private title: Title) {
    this.title.setTitle("User signup")
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  addForm: FormGroup;
  submitted = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  webUrl = new FormControl('', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]);
  phone = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10),]);
  address = new FormControl('', [Validators.required]);
  dob = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  validator = this.MustMatch('password', 'confirmPassword');

// Gender List for populating the dropdown
  genders = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' }
  ];

  get f() { return this.addForm.controls; }
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      email: this.email,
      name: this.name,
      webUrl: this.webUrl,
      phone: this.phone,
      address: this.address,
      dob: this.dob,
      gender: this.gender,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, {
      validator: this.validator
    });

  }

  // Checks if Email ID already exists in the database
  onEmailChange() {
    this.userService.checkIfEmailExists(this.email.value).then((data: boolean) => {
      this.emailExists = data;
    })

  }


  onPasswordChange() {
    this.passwordError = (this.password.value !== this.confirmPassword.value);
    console.log(this.passwordError);
  }

  onSubmit() {
    if ((sha256(this.addForm.value.password) === sha256(this.addForm.value.confirmPassword)) && !this.emailExists) {
      let data = this.addForm.value;
      
      data.password = sha256(this.addForm.value.password);  // Hashing the passwords to avoid sending the passwords in plain text
      data.confirmPassword = sha256(this.addForm.value.confirmPassword)  // Hashing the passwords to avoid sending the passwords in plain text
      this.userService.userSignUp(data);
    }
  }
}