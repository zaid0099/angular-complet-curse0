import { Todo } from './../models/Todo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  todosUrl: any = 'https://jsonplaceholder.typicode.com/todos';
  todoLimit = '?_limit=5';

  // Get Todos
  getTodos(): Observable<Todo[]> {
    // =======-- Use Localey. --=======
    // return [
    //   {
    //     id: 1,
    //     title: 'Todo One',
    //     completed: false,
    //   },
    //   {
    //     id: 2,
    //     title: 'Todo two',
    //     completed: true,
    //   },
    //   {
    //     id: 3,
    //     title: 'Todo three',
    //     completed: false,
    //   },
    // ];
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todoLimit}`);
  }
  // Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // Delete Todo ..
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }
}
