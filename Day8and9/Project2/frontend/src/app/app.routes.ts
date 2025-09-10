import { Routes } from '@angular/router';
import { BugsComponent } from './pages/bugs/bugs';
import { NewBugComponent } from './pages/new-bug/new-bug';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './unauthorized.component';
import { AdminDashboardComponent } from './admin-dashboardComponent';
import { BugDetailComponent } from './bug-detail.component';

export const routes: Routes = [
    {path:'dashboard',component:AdminDashboardComponent,title:'Dashboard',canActivate:[authGuard]},
    {path:'admin-dashboard',component:AdminDashboardComponent,title:'Admin Dashboard',canActivate:[authGuard, RoleGuard],data:{role:'Admin'}},
    {path:'bugs',component:BugsComponent,title:'Bugs',canActivate:[authGuard]},
    {path:'new-bug',component:NewBugComponent,title:'Report Bug',canActivate:[authGuard]},
    {path:'edit-bug/:id',component:NewBugComponent,title:'Edit Bug',canActivate:[authGuard]},
    {path:'bug-detail/:id',component:BugDetailComponent,title:'Bug Details',canActivate:[authGuard]},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'},
    {path:'unauthorized',component:UnauthorizedComponent},
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'**',redirectTo:'login'}
];
