import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { StudentsComponent } from './pages/students/students.component';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'students', component: StudentsComponent }
];
