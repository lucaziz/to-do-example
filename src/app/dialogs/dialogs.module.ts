import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// dialogs
import { DialogTaskComponent } from './dialog-task/dialog-task.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { DialogsService } from './dialogs.service';
import { TodoDataService } from '../services/todo-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  declarations: [
    DialogTaskComponent
  ],
  exports: [
    DialogTaskComponent
  ],
  entryComponents: [
    DialogTaskComponent
  ],
  providers: [
    DialogsService,
    TodoDataService
  ]
})
export class DialogsModule {}
