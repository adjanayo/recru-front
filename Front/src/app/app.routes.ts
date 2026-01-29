import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { JobListComponent } from './pages/jobs/job-list/job-list.component';
import { JobDetailComponent } from './pages/jobs/job-detail/job-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyApplicationsComponent } from './pages/my-applications/my-applications.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminJobsComponent } from './pages/admin/admin-jobs/admin-jobs.component';
import { AdminApplicationsComponent } from './pages/admin/admin-applications/admin-applications.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Auth routes (no layout)
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  
  // Public routes with layout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'jobs',
        component: JobListComponent
      },
      {
        path: 'jobs/:id',
        component: JobDetailComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-applications',
        component: MyApplicationsComponent,
        canActivate: [authGuard]
      }
    ]
  },
  
  // Admin routes with layout and guards
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'jobs',
        component: AdminJobsComponent
      },
      {
        path: 'applications',
        component: AdminApplicationsComponent
      },
      {
        path: 'users',
        component: AdminUsersComponent
      }
    ]
  },
  
  // Redirect unknown routes to home
  {
    path: '**',
    redirectTo: ''
  }
];
