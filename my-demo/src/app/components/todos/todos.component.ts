import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/delete-modal/delete-modal.component';

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

  openDeleteModal(todo: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '300px',
      data: { /* pass any data you need to the modal here */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked "Delete"
        this.todoService.deleteTodo(todo._id).subscribe(
          response => {
            this.getTodoList();
            this.toastr.success('Todo Successfully deleted', 'Success');
          },
          error => {
            this.toastr.error(error?.error?.message ? error?.error?.message : 'Todo delete Failed !', 'Error')
          }
        )
      } else {
        // User clicked "Cancel" or closed the modal
        console.log('Delete canceled');
      }
    });
  }

}
