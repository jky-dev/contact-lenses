import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit, OnChanges {
  @Input() array;
  dataSource;
  constructor() {}
  displayedColumns = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (typeof changes['array']['currentValue'] !== "undefined") {
      this.dataSource = new MatTableDataSource(this.array);
      this.dataSource.sort = this.sort;
      this.displayedColumns = [];
      if (this.array.length === 0) {
        return;
      }
      Object.keys(this.array[0]).forEach(key => {
        this.displayedColumns.push(key);
      });
    }
  }
}
