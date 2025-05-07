import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent, // основной layout с <router-outlet>
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./components/home/home.component');
          return m.HomeComponent;
        },
      },
      {
        path: 'app-dashboard',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./components/dashboard/dashboard.component');
          return m.DashboardComponent;
        },
      },
      {
        path: 'app-home',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./components/home/home.component');
          return m.HomeComponent;
        },
      },
      {
        path: 'app-calendar',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./components/calendar/calendar.component');
          return m.CalendarComponent;
        },
      },
      {
        path: 'app-map',
        loadComponent: async () => {
          const m = await import('./components/map/map.component');
          return m.MapComponent;
        },
      },
      {
        path: 'app-charts',
        loadComponent: async () => {
          const m = await import('./components/charts/charts.component');
          return m.ChartsComponent;
        },
      },
    ],
  },
];