import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './components/login/login.component';
import { RolesComponent } from './components/roles/roles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { CoursesComponent } from './components/courses/allCourses/courses.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ViewCourseComponent } from './components/courses/view-course/view-course.component';
import { EditCourseComponent } from './components/courses/edit-course/edit-course.component';
export const routes: Routes = [
    {path: "login",component: LoginComponent},
    {path: "chooseRole",component: RolesComponent},
    {path: "dashboard",component: DashboardComponent},
    {path: "sidebar",component: SidebarComponent},
    {path: "allUsers",component: UsersComponent},
    {path: "addUser",component: AddUserComponent},

    {path: "allCourses",component: CoursesComponent},
    {path: "course",component: ViewCourseComponent},
    {path: "addCourse",component: AddCourseComponent},
    {path: "editCourse",component: EditCourseComponent},

    {path: "allResources",component: ResourcesComponent},
    {path: "allAssignments",component: AssignmentsComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
