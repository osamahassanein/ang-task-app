import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Task } from '../model/task';
import { TaskapiService } from '../taskapi.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  mTasks: Array<any>;
  progressVal = 0;

  constructor(private taskapi: TaskapiService, private router: Router) {
    console.log('TaskListComponent constructor called');
  }

  ngOnInit() {
    console.log('TaskListComponent is here>>>>');
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskapi.getAllTasks().then(tasks => {
      console.log('tasks >>>>' + JSON.stringify(tasks));
      this.mTasks = tasks;
    });
  }

  btnClick(id: number) {
    this.router.navigate(['/api/tasks', id]);
  }
}
