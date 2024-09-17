import { Component, AfterViewInit, ElementRef } from '@angular/core';
import {Router} from "@angular/router"
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements AfterViewInit {
  constructor(private renderer: Renderer2,private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    this.getRole();
  }

  getRole() {
    this.elementRef.nativeElement.querySelector('.continue-button')?.addEventListener('click', () => {
      const selectedRole = (this.elementRef.nativeElement.querySelector('input[name="role"]:checked') as HTMLInputElement)?.value;
      this.router.navigateByUrl("/login", {state: {selectedRole}})
    });
  }
}


