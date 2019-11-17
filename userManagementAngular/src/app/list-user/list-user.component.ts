import { ChangeDetectorRef, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MediaMatcher} from '@angular/cdk/layout';
import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services/authentication.service";
import { Title } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface DialogData {
  element: Object
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'gender', 'dob', 'email', 'webUrl', 'phone', 'address', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  mobileQuery: MediaQueryList;
  
  navData = [{nav:[{ text: 'Profile Update', router: '/profile'}, {text: 'List Users',router: '/list-users'}], role: 'admin'},{nav:[{text: 'Profile Update',router: '/profile'}], role: 'user'}];
  fillerNav = this.navData.find(u => u.role == JSON.parse(localStorage.getItem("currentUser")).role).nav;

  private _mobileQueryListener: () => void;
  data: any;
  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router: Router, private userService: UserService, private authService: AuthenticationService, private title: Title) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.title.setTitle("List all registered users");
    this.userService.getAllUsers().then((mdata) => {
      console.log(mdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = JSON.parse(JSON.stringify(mdata));
    });
  }


  openDialog(element) {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '250px',
      data:{element: element}
    });

    this.data = element;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
      // this.animal = result;
    });
  }

  onEdit(item) {
    item.type = 'adminUpdate';
    localStorage.setItem("dataToEdit", JSON.stringify(item))
    this.router.navigate(['edit-user']);
  }

  onLogOut() {
    this.authService.logout();
  }
}


@Component({
  selector: 'dialogComponent',
  templateUrl: './dialogue.component.html',
})
export class DialogOverviewDialog {

  constructor(public userService: UserService,public dialogRef: MatDialogRef<DialogOverviewDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // console.log(this.data)
    console.log(data.element)
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.userService.removeUser(this.data.element).then(() => {
      
    })
    this.dialogRef.close();
  }

}