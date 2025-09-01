import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
    {path:'dashboard',component:DashboardComponent,title:'Dashboard'},
    {path:'bugs',component:BugsComponent,title:'Bugs'},
    {path:'login',component:LoginComponent,title:'login'},
    {path:'**',redirectTo:'dashboard'}
];
