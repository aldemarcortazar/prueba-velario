import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ CommonModule,  ReactiveFormsModule ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  public taskForm: FormGroup;

  constructor(private fb: FormBuilder, private TaskService: TaskService) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dueDate: ['', Validators.required],
      completed: [false],
      persons: this.fb.array([]), 
    });
  }

  get persons() {
    return this.taskForm.get('persons') as FormArray;
  }

  addPerson() {
    const personGroup = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
    this.persons.push(personGroup);
  }

  removePerson(index: number) {
    this.persons.removeAt(index);
  }
  
  addSkill(personIndex: number) {
    this.getSkills(personIndex).push(this.fb.control('', Validators.required));
  }

  getSkills(personIndex: number) {
    return (this.persons.at(personIndex).get('skills') as FormArray);
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  submit() {
    if (!this.taskForm.valid) {
      console.log('Formulario no válido');
      return;
    }
    const newTask = this.taskForm.value;
    this.TaskService.addTask(newTask);
    this.taskForm.reset(); 

  }
}
