import { Component, OnInit } from '@angular/core';
import { TaskapiService } from '../taskapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubtaskDialogComponent } from '../subtask-dialog/subtask-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  constructor(
    private taskapi: TaskapiService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  task: any = {};
  subtasks: any[] = [];
  progTempVal = 0;
  progressVal = 0;
  id = +this.route.snapshot.paramMap.get('id');
  displayedColumns: string[] = ['ID', 'Description', 'Status', 'Creation Date'];
  ngOnInit(): void {
    this.getTask();
    this.getSubTasks();
  }

  getTask(): void {
    console.log('Button DETAILS was Clicked>>>>>>');
    this.taskapi.getTaskByID(this.id).then((task) => {
      console.log('tasks >>>>' + JSON.stringify(task));
      this.task = task;
    });
  }

  getSubTasks(): void {
    this.taskapi.getSubTasksByTaskId(this.id).then((subtasks) => {
      console.log('subtasks >>>>' + JSON.stringify(subtasks));
      this.subtasks = subtasks;
      for (const subtask of this.subtasks) {
        if (subtask.status === 'Done') {
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

  addSubtask() {
    this.router.navigate(['/api/tasks/create-subtask', this.id]);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      task_id: this.id
    };

    const dialogRef = this.dialog.open(SubtaskDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((val) => {
      console.log('Subtask dialog output >>>', val);
      if (val) {
        this.progTempVal = 0;
        this.getSubTasks();
      }
    });
  }
}
