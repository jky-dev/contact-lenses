import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { multifocal } from '../../resources/multifocal';
import { spherical } from '../../resources/spherical';
import { tinted } from '../../resources/tinted';
import { toric } from '../../resources/toric';
import { Injectable } from '@angular/core';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { MatButtonModule } from '@angular/material';

@Component({
  selector: 'app-contacts',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
  encapsulation : ViewEncapsulation.None,
})
@Injectable()
export class OptionsComponent implements OnInit {
  dataSource: Array<object>;
  myClonedArray;
  animateScrollService = new NgAnimateScrollService();
  atTop = true;

  optionType = 'Spherical';
  selectedCompanies: Array<string> = [];
  selectedMaterials: Array<string> = [];
  selectedReplacements: Array<string> = [];
  selectedRangeType = 'Either';
  dktValue = 0;
  selectedBaseCurves = 'Either';

  options = ['Spherical', 'Toric', 'Tinted', 'Multifocal'];
  companies = [
    {name: 'Alcon', checked: false},
    {name: 'B&L', checked: false},
    {name: 'Coopervision', checked: false},
    {name: 'J&J', checked: false},
    {name: 'Menicon', checked: false}
  ];
  materials = [
    {name: 'Hydrogel', checked: false, value: 'H'},
    {name: 'Silicone Hydrogel', checked: false, value: 'SiH'}
  ];
  replacements = [
    {name: 'Daily Disposable', checked: false, value: 'DD'},
    {name: 'Fortnightly', checked: false, value: 'Fortnightly'},
    {name: 'Monthly', checked: false, value: 'Monthly'}
  ];
  rangetypes = ['Either', 'Maximum', 'Minimum'];
  baseCurves = ['Either', '1', '2'];

  ngOnInit() {}

  backToTop() {
    this.animateScrollService.scrollToElement('top', 750);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.scrollY === 0) {
      this.atTop = true;
    } else {
      this.atTop = false;
    }
  }

  search() {
    switch (this.optionType) {
      case 'Spherical': {
        this.dataSource = spherical;
        break;
      }
      case 'Multifocal': {
        this.dataSource = multifocal;
        break;
      }
      case 'Toric': {
        this.dataSource = toric;
        break;
      }
      case 'Tinted': {
        this.dataSource = tinted;
        break;
      }
      default: {
        return;
      }
    }
    this.myClonedArray = Object.assign([], this.dataSource);
    this.filterCompanies(this.myClonedArray);
    this.filterMaterials(this.myClonedArray);
    this.filterReplacements(this.myClonedArray);
    this.filterDkt(this.myClonedArray);
    this.filterBaseCurves(this.myClonedArray);
    this.animateScrollService.scrollToElement('resultsTable', 750);
  }

  onCompanyChecked(name: string, checked: boolean): void {
    if (checked === true) {
      this.selectedCompanies.push(name);
    } else {
      const idx = this.selectedCompanies.indexOf(name, 0);
      if (idx > -1) {
        this.selectedCompanies.splice(idx, 1);
      }
    }
  }

  onMaterialChecked(name: string, checked: boolean): void {
    if (checked === true) {
      this.selectedMaterials.push(name);
    } else {
      const idx = this.selectedMaterials.indexOf(name, 0);
      if (idx > -1) {
        this.selectedMaterials.splice(idx, 1);
      }
    }
  }

  onReplacementChecked(name: string, checked: boolean): void {
    if (checked === true) {
      this.selectedReplacements.push(name);
    } else {
      const idx = this.selectedReplacements.indexOf(name, 0);
      if (idx > -1) {
        this.selectedReplacements.splice(idx, 1);
      }
    }
  }

  /** Filters */
  filterCompanies(array) {
    if (this.selectedCompanies.length === 0) {
      return;
    }
    let idx = 0;
    while (idx < array.length) {
      const element = array[idx];
      if (this.selectedCompanies.indexOf(element.Company) === -1) {
        array.splice(idx, 1);
      } else {
        idx++;
      }
    }
  }

  filterMaterials(array) {
    if (this.selectedMaterials.length === 0) {
      return;
    }
    let idx = 0;
    while (idx < array.length) {
      const element = array[idx];
      if (this.selectedMaterials.indexOf(element.Material) === -1) {
        array.splice(idx, 1);
      } else {
        idx++;
      }
    }
  }

  filterReplacements(array) {
    if (this.selectedReplacements.length === 0) {
      return;
    }
    let idx = 0;
    while (idx < array.length) {
      const element = array[idx];
      if (this.selectedReplacements.indexOf(element.Replacement) === -1) {
        array.splice(idx, 1);
      } else {
        idx++;
      }
    }
  }

  filterDkt(array) {
    if (this.selectedRangeType === 'Either') {
      return;
    }
    let idx = 0;
    while (idx < array.length) {
      let value = array[idx]['Dkt'];
      if (typeof value === 'string') {
        value = value.split('%')[0];
      }
      if (this.selectedRangeType === 'Maximum') {
        if (value > this.dktValue) {
          array.splice(idx, 1);
        } else {
          idx++;
        }
      } else {
        if (this.dktValue > value) {
          array.splice(idx, 1);
        } else {
          idx++;
        }
      }
    }
  }

  filterBaseCurves(array) {
    if (this.selectedBaseCurves === 'Either') {
      return;
    }
    let idx = 0;
    while (idx < array.length) {
      const value: string = array[idx]['BaseCurve'].toString();
      if (value === 'undefined') {
        idx++;
        continue;
      }
      if (this.selectedBaseCurves === '1') {
        if (value.length > 3) {
          array.splice(idx, 1);
        } else {
          idx++;
        }
      } else {
        if (value.length <= 3) {
          array.splice(idx, 1);
        } else {
          idx++;
        }
      }
    }
  }
}
