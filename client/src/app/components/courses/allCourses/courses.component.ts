import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CustomCellComponent } from '../../custom-cell/custom-cell.component';
import { MatIconModule } from '@angular/material/icon';
import { CoursesService } from '../../../services/courses.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AgGridAngular, MatIconModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  pagination = true;
  paginationSize = 5;
  columnSize:any= {
    width: 180,
  }
  courses: any;
  rowData: any;
  search: string = '';
  private courseSubscription: Subscription | null = null;

  constructor(private courseService: CoursesService, private router: Router) {}

  getCourses(): void {
   

    this.courseSubscription = this.courseService.getAllCourses().subscribe(
      (course : any) => {
        this.courses = course;
        this.rowData = this.courses.data.filter((course: any) =>
          course.name.toLowerCase().includes(this.search.toLowerCase())
        ).map((course: any) => ({
          id: course.id,
          coursename: course.name,
          abbreviation: course.abbreviation,
          tutor: course.tutor,
          picture: course.picture
        }));
      },
     
    );
  }

  ngOnInit(): void {
    this.getCourses();
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }


  

  // Column Definitions: Defines the columns to be displayed.

  colDefs: ColDef[] = [
    { headerName: 'Course ID', field: 'id' },
    { headerName: 'Course name', field: 'coursename' },
    { headerName: 'Abbreviation', field: 'abbreviation' },
    { headerName: 'Tutor', field: 'tutor' },
    { headerName: 'Action', field: 'action', cellRenderer: CustomCellComponent }
  ];

  addCourse():void{

    this.router.navigate(['/addCourse'])
  }


}
