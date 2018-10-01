import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';

import { DialogTaskComponent } from './dialog-task/dialog-task.component';

@Injectable()
export class DialogsService {
    constructor(private dialog: MatDialog) { }

    public manageTask(param?: any): Observable<boolean> {
      let dialogRef: MatDialogRef<DialogTaskComponent>;
      dialogRef = this.dialog.open(DialogTaskComponent);
      dialogRef.componentInstance.param = param;
      return dialogRef.afterClosed();
    }

}
