import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit, OnChanges {
  @Input() array = [];
  columns = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (typeof changes['array']['currentValue'] !== 'undefined') {
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
    }
  }

}
