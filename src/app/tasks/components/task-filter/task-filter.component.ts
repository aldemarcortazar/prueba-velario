import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type TasksStatus = 'all' | 'completed' | 'pending';

@Component({
  selector: 'task-task-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css'
})
export class TaskFilterComponent {

  public taskFilter: TasksStatus = 'all';

  @Output()
  public taskFilterEmit: EventEmitter<string> = new EventEmitter();
  
  EmitFilter(){
    this.taskFilterEmit.emit(this.taskFilter);
  }
}
