import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './homepage/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { ListUsersComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list-users', component: ListUsersComponent,canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'profile', component: UserProfileComponent,canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.User] } },
  { path: 'edit-user', component: EditUserComponent,canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.User] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
