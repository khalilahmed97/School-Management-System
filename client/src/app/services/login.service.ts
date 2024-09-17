import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userRole: string =''
  
  constructor(private http:HttpClient) {

  }

  loginUser(loginObject: any){
    console.log(loginObject)
    const userData = {
      username: loginObject.username,
      password: loginObject.password,
      role: loginObject.role
      
    }
    console.log(userData)
    return this.http.post("http://127.0.0.1:3000/api/user/login", userData)
  }


  setUserRole(role: any): void {
   this.userRole=role

  }
  getUserRole(): string {
    // Wrap the role in an Observable
    return this.userRole;

  }
}
