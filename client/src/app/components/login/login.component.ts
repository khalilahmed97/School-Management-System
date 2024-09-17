import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar"


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  role: string | null = null
  snackbarRef: MatSnackBar

  loginObject: any = {
    username: "",
    password: "",
    role:""
  }
  http = inject(HttpClient)



  constructor(private loginService: LoginService, private router: Router, private snackbar: MatSnackBar) {

    this.snackbarRef = snackbar
  }


  ngOnInit(): void {

    const navigation = this.router.lastSuccessfulNavigation
    if (navigation?.extras.state) {
      this.role = navigation.extras.state.selectedRole
      this.loginObject = { role: this.role, ...this.loginObject }
    }

  }

  loginUser() {

    this.loginService.loginUser(this.loginObject).subscribe((res: any) => {
      if (res) {

        this.snackbarRef.open(res.message, '', {
          duration: 3000, // Duration in milliseconds
          panelClass: ['my-custom-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center',
          
        });
        
        this.router.navigate(['/dashboard'])
      }

    })

    this.loginService.setUserRole(this.role);
  }
}
