import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TaskapiService } from '../taskapi.service';

@Component({
  selector: 'app-subtask-dialog',
  templateUrl: './subtask-dialog.component.html',
  styleUrls: ['./subtask-dialog.component.css'],
})
export class SubtaskDialogComponent implements OnInit {
  form: FormGroup;
  taskId: string;
  today = new Date();
  latestDate = this.datepipe.transform(this.today, 'yyyy-MM-dd hh:m:ss');

  constructor(
    private taskapi: TaskapiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private router: Router,
    private dialogRef: MatDialogRef<SubtaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.taskId = data.task_id;
    this.form = fb.group({
      description: ['', Validators.required],
      status: [Validators.required],
      task_id: data.task_id,
      creation_date: [this.latestDate],
    });
  }

  ngOnInit(): void {}

  createSubtask(): void {
    this.taskapi.createSubtask(this.form.value).then((res) => {
      console.log('createSubtask resonse >>>>' + JSON.stringify(res));
      // this.router.navigate(['/api/tasks', this.form.value.task_id]);
      console.log('this.form.value >>>>' + JSON.stringify(this.form.value));
      this.dialogRef.close(this.form.value);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
