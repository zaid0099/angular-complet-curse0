import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  // Set Dynamic Classes
  setClasses(): any {
    const classes = {
      todo: true,
      'is-complete': this.todo.completed,
    };
    // console.log(classes);
    return classes;
  }

  // On Change ..
  onToggle(todo): void {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on Server
    this.todoService
      .toggleCompleted(todo)
      .subscribe((todo) => console.log(todo));
  }

  // On Delete ..
  onDelete(todo): void {
    this.deleteTodo.emit(todo);
  }
}
