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
    this.getTodoList()
  }

  getTodoList(): void {
    this.todoService.list().subscribe(
      response => {
        this.todos = response.todos
      },
      error => {
        console.error('List Error:', error);
      }
    )
  }

  createTodo(): void {
    this.todoService.create(this.title).subscribe(
      responce => {
        this.title = ''
        this.toastr.success('Todo Creation Successful!', 'Success');
        this.getTodoList();
      },
      error => {
        this.toastr.error(error?.error?.message ? error?.error?.message : 'Todo Creation Failed !', 'Error')
      }
    )
  }

  onCheckboxChange(todo: any) {
    this.todoService.checkUncheckTodo(todo._id, todo.title, !todo.isDone).subscribe(
      response => {
        this.getTodoList();
        const message = todo.isDone ? 'Todo successfully unchecked' : 'Todo successfully checked';
        this.toastr.success(message, 'Success');
      },
      error => {
        this.toastr.error(error?.error?.message ? error?.error?.message : 'Todo check/uncheck Failed !', 'Error')
      }

    )
    // Perform your desired method call here
    console.log(`Checkbox changed for todo with title: ${todo.title}`);
    // You can call any method or perform any logic you need here
  }

}
