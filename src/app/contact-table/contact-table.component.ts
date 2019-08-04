import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnChanges {
  @Input() array = [];
  dataSource = new MatTableDataSource(null);
  constructor() {}
  displayedColumns = [];
  sort: MatSort;

  // some work around to use ngIf and sorting
  @ViewChild(MatSort, {static: false}) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  ngOnChanges(changes) {
    if (typeof changes['array']['currentValue'] !== 'undefined') {
      this.dataSource = new MatTableDataSource(this.array);
      this.displayedColumns = [];
      if (this.array.length === 0) {
        return;
      }
      Object.keys(this.array[0]).forEach(key => {
        this.displayedColumns.push(key);
      });
    }
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }
}
