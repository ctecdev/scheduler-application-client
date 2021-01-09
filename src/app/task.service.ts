import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = "http://localhost:8080/api/tasks";

  constructor(private httpClient: HttpClient) {  }

  getTaskList(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.baseURL}`);
  }

  createTask(task: Task): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, task);
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.baseURL}/${id}`);
  }

  updateTask(task: Task): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}`, task);
  };

  deleteTask(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getOutput(): Observable<String[]> {
    return this.httpClient.get<String[]>(`${this.baseURL}/output`);
  }

  nameExists(name: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.set('name', name);
    return this.httpClient.get<boolean>(`${this.baseURL}/val/name`, {params});
  }

  isCronValid(cron: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.set('cron', cron);
    return this.httpClient.get<boolean>(`${this.baseURL}/val/cron`, {params});
  }

  isCodeValid(code: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.set('code', code);
    return this.httpClient.get<boolean>(`${this.baseURL}/val/code`, {params});
  }

}
