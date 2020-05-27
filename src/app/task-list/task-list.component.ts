import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Task } from '../model/task';
import { TaskapiService } from '../taskapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  mTasks: Array<any>;
  progressVal = 0;

  constructor(
    private taskapi: TaskapiService,
    private router: Router,
    private delSnackBar: MatSnackBar
  ) {
    console.log('TaskListComponent constructor called');
  }

  ngOnInit() {
    console.log('TaskListComponent is here>>>>');
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskapi.getAllTasks().then((tasks) => {
      console.log('tasks >>>>' + JSON.stringify(tasks));
      this.mTasks = tasks;
    });
  }

  btnClick(id: number) {
    this.router.navigate(['/api/tasks', id]);
  }

  deleteTask(id: number) {
    if (confirm('Are you sure to delete task? ' + id)) {
      this.taskapi.deleteTask(id).then((tasks) => {
        console.log('deleteTask response >>>>' + JSON.stringify(tasks));
        this.getAllTasks();
      });

      this.delSnackBar.open(
        'Task with id ' + id + ' deleted successfully!',
        'Dismiss',
        {
          duration: 3000,
        }
      );
    }
  }

  addTask() {
    this.router.navigate(['/api/tasks/create-task']);
  }
}
