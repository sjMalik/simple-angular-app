import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { DeleteModalComponent } from '../common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos?: Todo[];
  title: string = '';

  constructor(private todoService: TodoService, private toastr: ToastrService, private dialog: MatDialog) { }

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

  checkUncheckTodo(todo: any): void {
    this.todoService.checkUncheck(todo._id, todo.title, !todo.isDone).subscribe(
      response => {
        this.getTodoList();
        const message = todo.isDone ? 'Todo successfully unchecked' : 'Todo successfully checked';
        this.toastr.success(message, 'Success')
      },
      error => {
        this.toastr.error(error?.error?.message ? error?.error?.message : 'Todo check/uncheck Failed !', 'Error')
      }
    )
  }

  openDeleteModal(todo: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked 'Delete'
        this.todoService.delete(todo._id).subscribe(
          response => {
            this.getTodoList();
            this.toastr.success('Todo successfully deleted', 'Success')
          },
          error => {
            this.toastr.error(error?.error?.message ? error?.error?.message : 'Todo delete Failed !', 'Error')
          }
        )
      } else {
        // User click cancel
      }
    })
  }

}
