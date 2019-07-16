import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatRadioModule, MatIconModule, MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { MatSelectModule, MatAutocompleteModule, MatInputModule, MatOptionModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ContactTableComponent } from './contact-table/contact-table.component';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactTableComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatRadioModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: '', component: ContactsComponent }
    ])
  ],
  exports: [
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
