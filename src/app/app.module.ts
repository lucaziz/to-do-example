import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';

// services
import { TodoDataService } from './services/todo-data.service';

// dialogs
import { DialogsModule } from './dialogs/dialogs.module';

// material
import {
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// pipes
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DialogsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [TodoDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
