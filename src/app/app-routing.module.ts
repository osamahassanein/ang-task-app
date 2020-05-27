import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  {
    // path: '',
    // component: AppComponent,
    //  children: [
    // {
    path: '',
    redirectTo: 'api/tasks',
    pathMatch: 'full'
  },
  {
    path: 'api/tasks',
    component: TaskListComponent
  },
  {
    path: 'api/tasks/create-task',
    component: CreateTaskComponent
  },
  {
    path: 'api/tasks/:id',
    component: TaskComponent
    // }
    //  ]
  }
];

/*
    children: [
      { path: '', redirectTo: 'operators', pathMatch: 'full' },
      { path: 'operators', component: OperatorsComponent },
      { path: 'operators/:sid', component: OperatorComponent },
      { path: 'operators/:opSid/:opAccSid', component: OperatoraccountmobilesComponent }
    ]
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
