import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { Role } from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'user-registration';
}
