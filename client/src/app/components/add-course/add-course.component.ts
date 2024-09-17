import { Component } from '@angular/core';
import { MatIcon} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar"
import { CoursesService } from '../../services/courses.service';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule, MatIcon],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  course = {
    name: '',
    abbreviation:"",
    teacher: "",
    picture: '',
  };

  teachers:any = null

  snackbarRef: MatSnackBar;

  fieldsMessage='Please Fill out all the Fields'
  constructor (private courseService: CoursesService, private userService: UsersService,  private snackbar: MatSnackBar){
    this.snackbarRef=snackbar
  }

  ngOnInit(): void {
    this.getTeacher();
  }

  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (event: any) => {
       
        this.course.picture = event.target.result
      }
    }

   
  }

  saveCourse() {
    console.log(this.course)
    if(this.course.name==='' || this.course.abbreviation==='' || this.course.teacher==='' || this.course.teacher===undefined || this.course.picture===''){

      this.snackbarRef.open(this.fieldsMessage, 'Cancel', {
        duration: 3000, // Duration in milliseconds
        verticalPosition: 'top',
        panelClass: ['warning'],
        horizontalPosition: 'center',
        
      });
    }

    this.courseService.addCourse(this.course).subscribe(

      (res:any)=> {

        this.snackbarRef.open(res.message, 'Cancel', {
          duration: 3000, // Duration in milliseconds
          verticalPosition: 'top',
          panelClass: ['success'],
          horizontalPosition: 'center',
          
        });
      }

    )
}

getTeacher():void{
  this.userService.getAllUsers('Teacher').subscribe(
    (res:any) => {
      this.teachers = res.data
    }
  )
}
}