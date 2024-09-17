import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  getAllCourses(){
    return this.http.get("http://127.0.0.1:3000/api/course/allCourses")
  }

  getCourse(courseID: string){
    return this.http.get(`http://127.0.0.1:3000/api/course/${courseID}`)
  }

  addCourse(course: any){

    return this.http.post(`http://127.0.0.1:3000/api/course/addCourse`, course)
  }

  deleteCourse(id: any){

    return this.http.delete(`http://127.0.0.1:3000/api/course/delete/${id}`, )
  }

  updateCourse(courseID:string, course: Object){

    return this.http.patch(`http://127.0.0.1:3000/api/course/edit/${courseID}`, {course})
  }

}
