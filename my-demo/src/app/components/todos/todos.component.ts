import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos?: Todo[];
  title: string = '';

  constructor(private todoService: TodoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList(): void {
    this.todoService.list().subscribe(
      respones => {
        this.todos = respones.todos;
      },
      error => {
        console.error('Error fetching todolist', error);
      }
    )
  }

  createTodo(): void {
    this.todoService.create(this.title).subscribe(
      response => {
        this.title = '';
        this.getTodoList();
        this.toastr.success('Todo successfully created', 'Success')
      },
      error => {
        this.toastr.error(error?.error?.message ? error?.error?.message : 'Todo create Failed !', 'Error')
      }
    )
  }

}
