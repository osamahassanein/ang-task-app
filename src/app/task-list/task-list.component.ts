import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { Task } from '../model/task';
import { TaskapiService } from '../taskapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  mTasks: any[] = [];
  progressVal = 0;
  displayedColumns: string[] = [
    'ID',
    'Description',
    'Status',
    'Requester',
    'Creation Date',
    'Actions',
  ];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
      this.dataSource = new MatTableDataSource<any>(this.mTasks);
      this.dataSource.paginator = this.paginator;
    });
  }

  taskDetails(id: number) {
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

  updateTask(task: any) {
    /*
    this.taskapi.updateTask(task).then((res) => {
      console.log('updateTask response >>>>' + JSON.stringify(res));
      this.getAllTasks();
    });*/

    this.router.navigate(['/api/tasks/create-task', task]);
  }

  addTask() {
    this.router.navigate(['/api/tasks/create-task']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
