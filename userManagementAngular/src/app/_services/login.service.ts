import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { Observable } from 'rxjs';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  constructor(private httpClient: HttpClient) { }

  authenticateUser(mdata){
      console.log(mdata);
      return new Promise((resolve) => {
          return this.httpClient.post("http://localhost:3000/api/login", mdata).subscribe(data => {
              console.log("POST Request is successful ", data);
              localStorage.setItem("currentUser", JSON.stringify(data));
              resolve(data);
          }, error => {
              console.log("Error", error);
          });
      });
      
  }


}