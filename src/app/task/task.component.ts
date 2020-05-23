import { Component, OnInit } from '@angular/core';
import { TaskapiService } from '../taskapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  constructor(private taskapi: TaskapiService, private route: ActivatedRoute) {}

  task: any;
  subtasks: any[] = [];
  progTempVal = 0;
  progressVal = 0;
  id = +this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['ID', 'Description', 'Status'];
  ngOnInit(): void {
    this.getTask();
    this.getSubTasks();
  }

  getTask(): void {
    console.log('Button DETAILS was Clicked>>>>>>');
    this.taskapi.getTaskByID(this.id).then(task => {
      console.log('tasks >>>>' + JSON.stringify(task));
      this.task = task;
    });
  }

  getSubTasks(): void {
    this.taskapi.getSubTasksByTaskId(this.id).then(subtasks => {
      console.log('subtasks >>>>' + JSON.stringify(subtasks));
      this.subtasks = subtasks;
      for (const subtask of this.subtasks) {
        if (subtask.status === 'done') {
          this.progTempVal++;
        }
      }

      if (this.subtasks.length > 0) {
        this.progressVal = Math.trunc(
          (this.progTempVal / this.subtasks.length) * 100
        );
      } else {
        this.progressVal = this.task.status === 'Done' ? 100 : 0;
      }
    });
  }
}
