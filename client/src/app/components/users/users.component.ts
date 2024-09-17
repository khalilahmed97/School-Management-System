import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CustomCellComponent } from '../custom-cell/custom-cell.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CoursesService } from '../../services/courses.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CustomUserCellComponent } from './custom-user-cell/custom-user-cell.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AgGridAngular, MatIconModule, FormsModule, MatTabsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})



export class UsersComponent implements OnInit, OnDestroy {
  pagination = true;
  paginationSize = 5;
  users: any;
  rowData: any;
  search: string = '';
  role: string = '';
  private courseSubscription: Subscription | null = null;

  constructor(private userService: UsersService, private router: Router) {}

  getAllUsers(userRole:string): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }

    this.courseSubscription = this.userService.getAllUsers(userRole).subscribe(
      (user:Object) => {
        this.users = user;
        this.rowData = this.users.data.filter((user: any) =>
          user.email.toLowerCase().includes(this.search.toLowerCase())
        ).map((user: any) => ({
          id: user.id,
          name: user.firstName + " "+user.lastName,
          email: user.email,
          password: user.password,
          picture: user.picture
        }));
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  addUser(): void {
    console.log("click")
    this.router.navigate(['/addUser']);
  }

  ngOnInit(): void {
    // Set default role and fetch initial data
    this.role = 'Admin'; // or set the default tab role as needed
    this.getAllUsers(this.role);

  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

  onTabChange(event: any): void {
    const index = event.index;

    switch (index) {
      case 0:
        this.role = 'Admin';
        break;
      case 1:
        this.role = 'Teacher';
        break;
      case 2:
        this.role = 'Student';
        break;
    }

    this.getAllUsers(this.role); // Fetch users for the new role
  }





  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Courses', field: 'courses' },
    { headerName: 'Action', field: 'action', cellRenderer: CustomUserCellComponent }
  ];

 
}
