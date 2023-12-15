import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { CrudProfileComponent } from './upload/crud-profile/crud-profile.component';
import {MatTableModule} from '@angular/material/table';
import { ApiService } from './api.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDialogComponent } from './upload/crud-profile/edit-dialog/edit-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetricsEditComponent } from './metrics-edit/metrics-edit.component';
import {MatSliderModule} from '@angular/material/slider';




@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    CrudProfileComponent,
    EditDialogComponent,
    MetricsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    NgbModule,
    MatSliderModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
