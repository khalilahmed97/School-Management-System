import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {

  }

  getAllUsers(user:string){

    return this.http.get(`http://127.0.0.1:3000/api/user/allUsers/${user}`)
  }

  addUser(user: any){

    return this.http.post(`http://127.0.0.1:3000/api/user/addUser`, user)
  }

  deleteUser(id:string){

    return this.http.delete(`http://127.0.0.1:3000/api/user/delete/${id}`,)
  }
}
