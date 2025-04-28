import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';


export const routes: Routes = [
   {
    path: '',
    component: NavbarComponent, // this is the component with the <router-outlet> in the template
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
          return m.DashboardComponent
        },
      },
      {
        path: 'app-home', 
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./components/home/home.component');
          return m.HomeComponent
        }, 
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
      {
        path: 'app-charts',
        loadComponent: async () => {
          const m = await import('./components/charts/charts.component');
          return m.ChartsComponent
        } 
      },
      {
        path: 'add',
        loadComponent: async () => {
          const m = await import('./pages/add-edit-delete/add-edit-delete.component');
          return m.AddEditDeleteComponent
        } 
      },
      {
        path: 'edit/:id',
        loadComponent: async () => {
          const m = await import('./pages/add-edit-delete/add-edit-delete.component');
          return m.AddEditDeleteComponent
        } 
      },
      {
        path: 'delete/:id',
        loadComponent: async () => {
          const m = await import('./pages/add-edit-delete/add-edit-delete.component');
          return m.AddEditDeleteComponent
        } 
      },
    ],
  }, 
  {
    path: 'modal',
    loadComponent: async () => {
      const m = await import('./components/calendar/modal/modal.component');
      return m.ModalComponent
    } 
  },
];
