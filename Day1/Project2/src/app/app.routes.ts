import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SkillsComponent } from './pages/skills/skills';
import { ProjectsComponent } from './pages/projects/projects';
import { ExperienceComponent } from './pages/experience/experience';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
