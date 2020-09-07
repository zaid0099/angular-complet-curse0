import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }
  deleteTodo(todo: Todo): void {
    // Remove From UI
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    // Remove From Server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo): void {
    this.todoService.addTodo(todo).subscribe((todo) => {
      this.todos.push(todo);
    });
  }
}
