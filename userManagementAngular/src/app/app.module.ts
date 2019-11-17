import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './homepage/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent,DialogOverviewDialog } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppComponent } from './app.component'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule,MatListModule,MatSidenavModule,MatIconModule,MatInputModule,MatFormFieldModule, MatTableModule, MatPaginatorModule,MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule, MatCardModule, MatButtonModule } from '@angular/material';
import {SpecialCharacterDirective } from './_directives/alphanumeric.directive';
import {EmailDirective } from './_directives/email.directive';
import {AlphabetDirective } from './_directives/alphabet.directive'
import {NumbersOnlytDirective } from './_directives/numbersOnly.directive'


import { CookieService } from 'ngx-cookie-service'

import { JwtInterceptor } from './_helpers/jwt.inceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    EditUserComponent,
    ListUsersComponent,
    LoginComponent,
    UserProfileComponent,
    SpecialCharacterDirective,
    EmailDirective,
    AlphabetDirective,
    NumbersOnlytDirective,
    DialogOverviewDialog
  ],
  imports: [
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  entryComponents: [DialogOverviewDialog],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }, CookieService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
