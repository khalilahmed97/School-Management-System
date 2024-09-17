import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererParams } from 'ag-grid-community';
import { Clipboard } from '@angular/cdk/clipboard';
import { UsersService } from '../../../services/users.service';
import { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: 'app-custom-user-cell',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './custom-user-cell.component.html',
  styleUrls: ['./custom-user-cell.component.css']
})
export class CustomUserCellComponent implements OnInit {
  data: any;
  snackbarRef: MatSnackBar;

  constructor(private clipboard: Clipboard, private userService: UsersService, snackbar: MatSnackBar) {

    this.snackbarRef=snackbar
  }

  agInit(params: ICellRendererParams): void {
    // Initialize the row data
    this.data = params.data;
    // if (params.cellRendererParams && params.cellRendererParams.getRowData) {
    //   this.getRowData = params.cellRendererParams.getRowData;
    // }
  }

  ngOnInit(): void {}

  copyPassword() {
    this.clipboard.copy(this.data.password); // Assuming 'password' is the field you want to copy
  }

  deleteUser(){
    this.userService.deleteUser(this.data.id).subscribe((result : any) =>
      
      {

        this.snackbarRef.open(result.message, '', {
          duration: 2000, // Duration in milliseconds
          verticalPosition: 'top',
          panelClass: ['success'],
          horizontalPosition: 'center',
          
        });

      }
    )
  }

}
