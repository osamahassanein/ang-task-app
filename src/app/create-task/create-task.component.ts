import { Component, OnInit } from '@angular/core';
import { TaskapiService } from '../taskapi.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  statusList = ['Done', 'Not done', ''];
  today = new Date();
  latestDate = this.datepipe.transform(this.today, 'yyyy-MM-dd hh:m:ss');
  task = {
    description: '',
    status: '',
    requester: '',
    creation_date: this.latestDate,
  };
  // value = 'TEST';

  constructor(
    private taskapi: TaskapiService,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {}

  createTask(): void {
    this.taskapi.createTask(this.task).then((res) => {
      console.log('createTask resonse >>>>' + JSON.stringify(res));
      this.router.navigate(['/api/tasks', res.insertId]);
    });
  }
}
