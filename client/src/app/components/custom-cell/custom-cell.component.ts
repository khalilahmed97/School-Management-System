import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-cell',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './custom-cell.component.html',
  styleUrl: './custom-cell.component.css'
})
export class CustomCellComponent {

  data: any
  constructor(private courseService: CoursesService, private snackbarRef: MatSnackBar, private router:Router) {

  }

  agInit(params: ICellRendererParams): void {
    this.data = params.data
  }

  deleteCourse() {

    this.courseService.deleteCourse(this.data.id).subscribe((res: any) => {
      this.snackbarRef.open(res.message, '', {
        duration: 2000, // Duration in milliseconds
        verticalPosition: 'top',
        panelClass: ['success'],
        horizontalPosition: 'center',
      })

    })
  }

  viewCourse() {
    this.router.navigate(['/course'], { state: {  course:this.data }})
  }

  editCourse() {
    this.router.navigate(['/editCourse'], { state: {  course:this.data }})
  }

}
