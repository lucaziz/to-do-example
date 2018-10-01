import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoDataService } from '../../services/todo-data.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { Filters } from '../../models/filters';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public listTasks: Array<Todo>;
  public loading: boolean;
  public filters: Filters;

  constructor(
    private todoDataService: TodoDataService,
    private dialogsService: DialogsService
  ) {
    this.filters = new Filters();
  }
  
  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.loading = true;
    this.todoDataService.getAllTasks().subscribe(res => {
      this.listTasks = res;
      this.loading = false;
    });
  }

  openDialog(param?: Todo) {
    this.dialogsService
    .manageTask(param)
    .subscribe(res => {
      if (res === true) {
        this.getTasks();
      }
    });
  }

  toggleComplete(task: any, checked: any) {
    task.complete = checked.checked;
    this.todoDataService
    .editTask(task.id, task)
    .subscribe(res => console.log(res));
  }

  editTask(task: any) {
    this.dialogsService
    .manageTask(task)
    .subscribe(res => {
      if (res === true) {
        this.getTasks();
      }
    });
  }
  

  removeTask(id: number) {
    this.todoDataService
    .deleteTask(id)
    .subscribe(res => {
      this.getTasks();
    });
  }



}
