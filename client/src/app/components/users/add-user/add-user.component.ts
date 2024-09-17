import { Component } from '@angular/core';
import { MatIcon} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar"
import { UsersService } from '../../../services/users.service';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatIcon, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {


  snackbarRef: MatSnackBar;

  constructor (private userService: UsersService,  private snackbar: MatSnackBar){
    this.snackbarRef=snackbar
  }
  user = {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    phone: '',
    role: '',
    gender: ''
  };

  fieldsMessage='Please Fill out all the Fields'


  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (event: any) => {
       
        this.user.picture = event.target.result
      }
    }

   
  }

  saveUser() {
    if(this.user.firstName==='' || this.user.lastName==='' || this.user.email==='' || this.user.phone==='' || this.user.gender==='' || this.user.role==='' || this.user.picture===''){

      this.snackbarRef.open(this.fieldsMessage, 'Cancel', {
        duration: 3000, // Duration in milliseconds
        verticalPosition: 'top',
        panelClass: ['warning'],
        horizontalPosition: 'center',
        
      });
    }

    this.userService.addUser(this.user).subscribe(

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
}
