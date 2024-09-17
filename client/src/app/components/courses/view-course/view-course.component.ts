import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-course',
  standalone: true,
  imports: [MatIcon, FormsModule],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent implements OnInit{


  teachers: any
  course: any

  constructor(private router: Router){}

  ngOnInit():void{
    
    const navigation = this.router.lastSuccessfulNavigation
    if (navigation?.extras.state) {
      this.course = navigation.extras.state.course
      
    }
    console.log(this.course)
  }

}
