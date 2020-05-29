import { Component, OnInit } from '@angular/core';
import { TaskapiService } from '../taskapi.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  statusList = ['Done', 'Not done'];
  today = new Date();
  latestDate = this.datepipe.transform(this.today, 'yyyy-MM-dd hh:m:ss');
  task = {
    task_id: 0,
    description: '',
    status: '',
    requester: '',
    creation_date: this.latestDate,
    last_update_date: this.latestDate,
  };
  btnLabel = 'Create';

  constructor(
    private taskapi: TaskapiService,
    private router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe
  ) {
    const passedTask = this.router.getCurrentNavigation().extras.state;
    console.log(passedTask);
    if (passedTask !== undefined) {
      this.task = {
        task_id: passedTask.task_id,
        description: passedTask.description,
        status: passedTask.status,
        requester: passedTask.requester,
        creation_date: this.datepipe.transform(
          passedTask.creation_date,
          'yyyy-MM-dd hh:m:ss'
        ),
        last_update_date: this.latestDate,
      };
      this.btnLabel = 'Edit';
    }
    /*
    this.route.params.subscribe((params) => {
      console.log('params >>>' + JSON.stringify(params));
      if (params.task_id) {
        console.log(params);
        this.task = {
          task_id: params.task_id,
          description: params.description,
          status: params.status,
          requester: params.requester,
          creation_date: this.datepipe.transform(
            params.creation_date,
            'yyyy-MM-dd hh:m:ss'
          ),
          last_update_date: this.latestDate,
        };
        this.btnLabel = 'Edit';
      }
    });
    */
  }

  ngOnInit(): void {}

  saveTask(): void {
    if (this.btnLabel === 'Create') {
      this.taskapi.createTask(this.task).then((res) => {
        console.log('createTask resonse >>>>' + JSON.stringify(res));
        this.router.navigate(['/api/tasks', res.insertId]);
      });
    } else if (this.btnLabel === 'Edit') {
      this.taskapi.updateTask(this.task).then((res) => {
        console.log('updateTask response >>>>' + JSON.stringify(res));
        this.router.navigate(['/api/tasks', this.task.task_id]);
      });
    }
  }
}
