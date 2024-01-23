import { Component } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos?: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.list().subscribe(
      response => {
        console.log(response);
        this.todos = response.todos
      },
      error => {
        // Handle the error here
        console.error('List Error:', error);
      }
    )
  }

}
