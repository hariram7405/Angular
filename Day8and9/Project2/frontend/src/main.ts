import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
 
bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
  ]
}).catch(err => console.error(err));