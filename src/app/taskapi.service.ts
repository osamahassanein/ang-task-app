import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
// import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskapiService {
  apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Promise<any[]> {
    console.log('Before back-end call............');
    console.log(this.apiUrl);
    return this.http
      .get(this.apiUrl)
      .toPromise()
      .then(response => response as any[])
      .catch(this.handleError);
    console.log('after back-end call............');
  }

  getTaskByID(id: number): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log('getTaskByID URL' + url);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  createTask(task: any): Promise<any> {
    const url = `${this.apiUrl}/create-task`;
    console.log('createTask URL >>>' + url);
    return this.http
      .post(url, task)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  createSubtask(subtask: any): Promise<any> {
    const url = `${this.apiUrl}/create-subtask`;
    console.log('createSubTask URL >>>' + url);
    return this.http
      .post(url, subtask)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  getSubTasksByTaskId(id: number): Promise<any>{
    const url = `${this.apiUrl}/${id}/subtasks`;
    console.log('getSubTasksByTaskId URL' + url);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
