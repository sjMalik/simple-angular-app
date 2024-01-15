import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TodosComponent } from './components/todos/todos.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    TodosComponent,
    NewTodoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right', // Set the desired position
        preventDuplicates: true, // Optional: Prevent duplicate toasts
        closeButton: true, // Optional: Display close button
        progressBar: true // Optional: Display progress bar
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
