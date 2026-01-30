import { Routes } from '@angular/router';
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
import { CandidatLayoutComponent } from './layouts/candidat-layout/candidat-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';

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
  {
    path: '',
    component: CandidatLayoutComponent,
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
  {
    path: 'candidat',
    component: CandidatLayoutComponent,
    children: [

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
    component: AdminLayoutComponent,
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
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
      },

    ]
  },

  // Redirect unknown routes to home
  {
    path: '**',
    redirectTo: ''
  }
];
