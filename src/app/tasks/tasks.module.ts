import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsModule } from '../persons/persons.module';
import { TaskRoutingModule } from './tasks.routes';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskRoutingModule,
    HttpClientModule,
  ]
})
export class TasksModule { }
