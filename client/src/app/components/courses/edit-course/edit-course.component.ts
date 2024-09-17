import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CoursesService } from '../../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FormsModule,MatIcon],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit{

  selectedCourse = {
    id:'',
    coursename: '',
    abbreviation:"",
    teacher: "",
    picture: '',
  };
  teachers:any

  constructor(private router: Router, private courseService: CoursesService, private snackbar: MatSnackBar){
    
  }

  ngOnInit(){

    const navigation = this.router.lastSuccessfulNavigation
    if(navigation?.extras.state){
      this.selectedCourse = navigation.extras.state.course
    }

  }

  onFileSelected(event:any){
 const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (event: any) => {
       
        this.selectedCourse.picture = event.target.result
      }
    }
  }
  editCourse(){
    console.log(this.selectedCourse)
    this.courseService.updateCourse(this.selectedCourse.id, this.selectedCourse).subscribe(
      (res:any) => {
        this.snackbar.open(res.message, 'Cancel', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success'],
          horizontalPosition: 'center',
          
        });
      }
    )

  }



}
