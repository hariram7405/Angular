import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './unauthorized.component';

export const routes: Routes = [
    {path:'dashboard',component:DashboardComponent,title:'Dashboard',canActivate:[authGuard]},
    {path:'bugs',component:BugsComponent,title:'Bugs',canActivate:[authGuard,RoleGuard('Admin')]},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'},
    {path:'unauthorized',component:UnauthorizedComponent},
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'**',redirectTo:'login'}
];
