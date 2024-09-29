import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from './../../models/task.model'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFilterComponent } from "../task-filter/task-filter.component";
import { TaskService } from '../../../core/services/task.service';
import { provideHttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'task-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFilterComponent, ],
  providers: [TaskService ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public filterTask: string = 'all'; 
  private tasksSubscription: Subscription | undefined;
  

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasksSubscription = this.taskService.allTask().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.filteredTasks = tasks; 
    });
  }

  handleTaskStatus(filterTask: string){
    this.filterTask = filterTask;
    this.filterTasks();
  }

  filterTasks() {
    if (this.filterTask === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
      return;
    }  
    if (this.filterTask === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
      return;
    }  
      this.filteredTasks = this.tasks;     
  }

  toggleCompletion(taskId: number) {
    this.taskService.toggleCompletion(taskId);
    this.filterTasks(); 
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
    this.filterTasks();
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe(); 
    }
  }
}
