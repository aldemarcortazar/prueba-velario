import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, take, tap } from 'rxjs';
import { Task } from '../../tasks/models/task.model';
import { JSONPlaceholderUser } from '../models/json-placeholder-users.model';
import { JSONPlaceholderService } from './json-place-holder.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject(this.tasks);
  
  private remoteTasksCache: Task[] | null = null; // Cache para tareas remotas

  constructor(private jsonPlaceHolder: JSONPlaceholderService) {}

  // Obtener tareas locales
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable()
      .pipe(
        catchError((error) => {
          console.error('Error durante getTasks:', error);
          return of([]);
        })
      );
  }
  

  private loadRemoteTasks(): Observable<Task[]> {
    if (this.remoteTasksCache) {
      return of(this.remoteTasksCache);
    }

    return this.jsonPlaceHolder.getData<JSONPlaceholderUser[]>('/todos')
      .pipe(
        take(1), 
        map((remoteTasks: JSONPlaceholderUser[]) => {
          this.remoteTasksCache = remoteTasks.map(task => ({
            id: task.id,
            title: task.title,
            completed: task.completed,
            dueDate: new Date(),
            name: task.title,
            persons: [],
          }));
          return this.remoteTasksCache;
        }),
        catchError((error) => {
          console.error('Error durante getTaskJSONPlaceHolder:', error);
          return of([]); // Si hay un error, devolver un array vacío
        })
      );
  }


  allTask(): Observable<Task[]> {
    return combineLatest([
      this.loadRemoteTasks(),  
      this.getTasks()          
    ])
    .pipe(
      map(([remoteTasks, localTasks]) => {
        const allTasks = [...localTasks, ...remoteTasks];
        this.tasks = allTasks;  
        return allTasks;
      }),
      catchError((error) => {
        console.error('Error combinando las tareas:', error);
        return of([]);  
      })
    );
  }
  
  
  addTask(task: Task) {
    const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    const newTask = { ...task, id: newId };
    
    this.tasks.push(newTask);  
    console.log('Tarea agregada:', newTask);
    this.tasksSubject.next(this.tasks); 
  }
  toggleCompletion(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next(this.tasks);  
    }
  }

  
  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.tasksSubject.next(this.tasks);  
  }
}
