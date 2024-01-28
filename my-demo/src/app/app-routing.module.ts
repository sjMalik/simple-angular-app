import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { TodosComponent } from './components/todos/todos.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { MailboxComponent } from './components/email/mailbox/mailbox.component';
import { ComposeEmailComponent } from './components/email/compose-email/compose-email.component';
import { ViewEmailComponent } from './components/email/view-email/view-email.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to the layout route
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'todos', component: TodosComponent },
      { path: 'mailbox', component: MailboxComponent },
      { path: 'compose-email', component: ComposeEmailComponent },
      { path: 'view-email', component: ViewEmailComponent },
      { path: '', redirectTo: '/todos', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
