import { Component } from '@angular/core';
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../../../core/services/task.service';
import { JSONPlaceholderService } from '../../../core/services/json-place-holder.service';

@Component({
  selector: 'tasks-home-page',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent, HttpClientModule],
  providers: [TaskService, JSONPlaceholderService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
