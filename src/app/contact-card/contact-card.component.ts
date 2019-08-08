import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit, OnChanges {
  @Input() array = [];
  sortedArray = [];
  columns = [];
  orderOptions = ['Name', 'Company', 'Dkt'];
  selected = 'Name';
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (typeof changes.array.currentValue !== 'undefined') {
      this.columns = [];
      if (this.array.length === 0) {
        return;
      }
      Object.keys(this.array[0]).forEach(key => {
        if (key === 'Name' || key === 'Company' || key === 'Material' || key === 'Replacement') {

        } else {
          this.columns.push(key);
        }
      });
      this.sortedArray = this.filterBy(this.selected, this.array);
    }
  }

  changeHandler(event: MatSelectChange) {
    this.sortedArray = this.filterBy(event.value, this.array);
  }

  filterBy(value: string, array: any[]) {
    return array.sort((a, b) => a[value] > b[value] ? 1 : a[value] === b[value] ? 0 : -1);
  }

}
