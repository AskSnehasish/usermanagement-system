import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service'


@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private httpClient: HttpClient, private router: Router, private cS: CookieService) { }

  userSignUp(mdata) {
    return this.httpClient.post("http://localhost:3000/api/addUser", mdata).subscribe(data => {
      console.log("POST Request is successful ", data);
      this.router.navigate(["login"]);
    }, error => {
      console.log("Error", error);
    });

  }

  updateUser(mdata) {
    console.log(mdata);
    return new Promise((resolve) => {
      return this.httpClient.put("http://localhost:3000/api/updateUser", mdata).subscribe(data => {
        console.log("POST Request is successful ", data);
        resolve();
      }, error => {
        console.log("Error", error);
      });
    });
  }

  removeUser(mdata) {
    console.log("Yes");
    console.log(mdata);
    return new Promise((resolve) => {
      let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),      
        body : mdata
      }
      return this.httpClient.delete("http://localhost:3000/api/removeUser", options).subscribe(data => {
        console.log("POST Request is successful ", data);
        resolve();
      }, error => {
        console.log("Error", error);
      });
    });
  }

  checkIfEmailExists(email) {
    return new Promise((resolve) => {
      return this.httpClient.post("http://localhost:3000/api/checkIfEmailExists", {email: email}).subscribe(data => {
        console.log("POST Request is successful ", data);
        resolve(data);
        // this.router.navigate(["list-users"]);
      }, error => {
        console.log("Error", error);
      });
    });
  }

  getAllUsers() {
    return new Promise((resolve) => {
      return this.httpClient.get("http://localhost:3000/api/getAllUsers").subscribe(data => {
        console.log("POST Request is successful ", data);
        resolve(data);
      }, error => {
        console.log("Error", error);
      });
    });
  }

}