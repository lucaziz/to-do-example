import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TodoDataService } from '../../services/todo-data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Todo } from '../../models/todo';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Tags } from '../../models/tags';

@Component({
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss']
})
export class DialogTaskComponent implements OnInit {

    public header: string;
    public param: Todo;
    public form: FormGroup;
    public loading: boolean;
    public opp: string;
    public newTask: Todo = new Todo();

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredTags: Observable<Tags[]>;
    tags: Array<string> = [];
    allTags: Array<any>;
    tagsCtrl = new FormControl();

    @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;

    constructor(
      public dialogRef: MatDialogRef<DialogTaskComponent>,
      private todoDataService: TodoDataService,
      private _fb: FormBuilder
    ) {
      this.filteredTags = this.tagsCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : (this.allTags ? this.allTags.slice() : null)));
    }

    ngOnInit() {
      this.getTags();
      this.header = 'Teste To-Do';
      if (this.param) { 
        this.opp = 'edit';
        this.tags = (this.param.tags ? this.param.tags : []);
      }
      this.form = this._fb.group({
          id: [(this.param ? this.param.id : null)],
          date: [(this.param ? this.param.date : null), [Validators.required]],
          time: [(this.param ? this.param.time : null), [Validators.required]],
          title: [(this.param ? this.param.title : null), [Validators.required]],
          description: [(this.param && this.param.description ? this.param.description : null)],
          duration: [(this.param && this.param.duration ? this.param.duration : null)],
          reminder: [(this.param && this.param.reminder ? this.param.reminder : null)],
          tags: [null],
          complete: [(this.param ? this.param.complete : false)]
      });

    }

    getTags() {
      this.todoDataService.getTags()
      .subscribe(res => {
        const arrangeTags = res.map(function (el) { return el.name; });
        this.allTags = arrangeTags;
      });
    }

    addTask() {
      this.todoDataService.addTask(this.form.value)
      .subscribe(res => {
        this.newTask = new Todo();
        this.loading = false;
        this.dialogRef.close(true);
      });
    }

    editTask() {
      this.todoDataService
      .editTask(this.form.get('id').value, this.form.value)
      .subscribe(res => {
        this.loading = false;
        this.dialogRef.close(true);
      });
    }

    onSubmit(opp: string) {
      this.loading = true;
      this.form.get('tags').setValue(this.tags);
      if (opp == 'edit') {
        this.editTask();
      } else {
        this.addTask();
      }
    }

    // TAGS
    addTag(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      if (value.trim() != '') {
        if (this.allTags.includes(value)) {
          if ((value || '').trim()) {
            this.tags.push(value.trim());
          }
          if (input) {input.value = '';}
          this.tagsCtrl.setValue(null);
        } else {
          this.todoDataService.addTag({name: value})
          .subscribe(res => {
            if ((value || '').trim()) {
              this.tags.push(value.trim());
            }
            if (input) {input.value = '';}
            this.tagsCtrl.setValue(null);
          });
        }
      }      
    }
    removeTag(tag: string): void {
      const index = this.tags.indexOf(tag);
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }
    selected(event: MatAutocompleteSelectedEvent): void {
      this.tags.push(event.option.viewValue);
      this.tagsInput.nativeElement.value = '';
      this.tagsCtrl.setValue(null);
    }

    private _filter(value: any): Array<Tags> {
      const filterValue = (typeof value == 'string' ? value : value.name.toLowerCase());
      return this.allTags.filter((tag: any) => tag.toLowerCase().indexOf(filterValue) === 0);
    }
}
