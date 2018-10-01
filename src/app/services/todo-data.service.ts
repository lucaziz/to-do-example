import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from '../models/todo';
import { Tags } from '../models/tags';

@Injectable()
export class TodoDataService {

  private ABSOLUTEPATH = 'https://5bae332fa65be000146763f8.mockapi.io/api/todotest/';

  constructor(
    private http: Http
  ) {}

  result(res: any) {
    const response = res.json();
    if (response.result == 'ERROR') {
        throw Observable.throw(response);
    } else {
        return res.json();
    }
  }

  // ADD TASK
  addTask(task: Todo): Observable<Todo[]> {
    let url: string;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    url = 'task/';
    return this.http.post(this.ABSOLUTEPATH + url, task, options).pipe(map(res => this.result(res)));
  }

  // DELETE TASK
  deleteTask(id: number): Observable<Todo[]> | any {
    let url: string;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    url = 'task/' + id;
    return this.http.delete(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
  }

  // EDIT TASK
  editTask(id: any, values: Object): Observable<Todo[]> | any {
    let url: string;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    url = 'task/' + id;
    return this.http.put(this.ABSOLUTEPATH + url, values, options).pipe(map(res => this.result(res)));
  }

  // LIST TASKS
  getAllTasks(): Observable<Todo[]> | any {
    let url: string;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    url = 'task/';
    return this.http.get(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
  }

  // GET TASK
  getTask(id: number): Observable<Todo[]> | any {
    let url: string;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    url = 'task/' + id;
    return this.http.get(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
  }


  // GET TAGS
  getTags(): Observable<Tags[]> | any {
    let url: string;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    url = 'tags/';
    return this.http.get(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
  }

  // ADD TAG
  addTag(task: Tags): Observable<Tags[]> {
    let url: string;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    url = 'tags/';
    return this.http.post(this.ABSOLUTEPATH + url, task, options).pipe(map(res => this.result(res)));
  }

  // DELETE TASK
  deleteTag(id: number): Observable<Tags[]> | any {
    let url: string;
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    url = 'tags/' + id;
    return this.http.delete(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
  }



}