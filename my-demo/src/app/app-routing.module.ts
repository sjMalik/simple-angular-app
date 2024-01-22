import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TodosComponent } from './components/todos/todos.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard
import { RegistrationComponent } from './components/registration/registration.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to the layout route
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'todos', component: TodosComponent },
      { path: 'newTodo', component: NewTodoComponent },
      { path: '', redirectTo: '/todos', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
