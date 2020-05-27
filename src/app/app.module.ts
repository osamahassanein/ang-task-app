import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TaskapiService } from './taskapi.service';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { TaskListComponent } from './task-list/task-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { TaskComponent } from './task/task.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateTaskComponent } from './create-task/create-task.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SubtaskDialogComponent } from './subtask-dialog/subtask-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    CreateTaskComponent,
    SubtaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
    MatGridListModule,
    MatTableModule,
    MatProgressBarModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  providers: [TaskapiService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [SubtaskDialogComponent],
})
export class AppModule {}
