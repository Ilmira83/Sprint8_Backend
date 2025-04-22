import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';


export const routes: Routes = [
   {
    path: '',
    component: NavbarComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'app-home', 
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./components/home/home.component');
          return m.HomeComponent
        }, 
      },
      {
        path: 'app-dashboard',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./components/dashboard/dashboard.component');
          return m.DashboardComponent
        },
      /*  canActivate: [LoginGuard],   */
      },
      {
        path: 'app-calendar',
        loadComponent: async () => {
          const m = await import('./components/calendar/calendar.component');
          return m.CalendarComponent
        } 
      },
      {
        path: 'app-map',
        loadComponent: async () => {
          const m = await import('./components/map/map.component');
          return m.MapComponent
        } 
      },
    ],
  }, 
];
