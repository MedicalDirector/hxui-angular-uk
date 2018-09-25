export class FiltersCode {

  usage =
    `
    import { FiltersModule } from "@hxui/angular";

    @NgModule({
      imports: [FiltersModule.forRoot(), ...]
    })
    export class AppModule() {}
    `;

  exampleTemplate =
    `
  <div class="hx-flex hx-flex-align-center">
     <button type="button" class="hx-button is-primary mr-1" (click)="toggleCollapsed()">Toggle collapsed state</button>
     <button type="button" class="hx-button is-primary" (click)="clearFilters()">Clear filters</button>
     <div class="hx-spacer"></div>
     <hxa-filters #filterComp [collapsed]="collapsed" [filters]="filters"></hxa-filters>
  </div>
    `;

  exampleTypescript =
    `
  import {Component, Inject, OnInit, ViewChild} from '@angular/core';
  import {IFiltersConfig} from '@hxui-angular/filters/filters-config.interface';
  import {FilterType} from '@hxui-angular/filters/filters-type.enum';
  import {FiltersComponent as HxFiltersComponent } from '@hxui-angular/filters/filters.component';
  
  @Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html'
  })
  export class FiltersComponent  {
  
    @ViewChild('filterComp') filtersComponent: HxFiltersComponent;
  
    collapsed = false;
    filters: IFiltersConfig[] = [
      {
        id: 'workareaFilter',
        type: FilterType.SingleSelect,
        label: 'Work area',
        options: [
          {
            label: 'Dental',
            value: 0,
            selected: false
          },
          {
            label: 'GP',
            value: 1,
            selected: true
          },
          {
            label: 'Physio',
            value: 2,
            selected: false
          },
          {
            label: 'Radiology',
            value: 3,
            selected: false
          },
          {
            label: 'Skin Cancer Clinic',
            value: 4,
            selected: false
          },
          {
            label: 'Specialist',
            value: 5,
            selected: false
          }
        ],
        defaultIndex: 1,
        callback: [this.onFilterHandler, 'workarea']
      },
      {
        id: 'statusFilter',
        type: FilterType.SingleSelect,
        label: 'Status',
        options: [
          {
            label: 'All',
            value: 0,
            selected: true
          },
          {
            label: 'Waiting',
            value: 1,
            selected: false
          },
          {
            label: 'In consult',
            value: 2,
            selected: false
          },
          {
            label: 'Finished consult',
            value: 3,
            selected: false
          },
          {
            label: 'Did not wait',
            value: 4,
            selected: false
          }
        ],
        callback: [this.onFilterHandler, 'status']
      },
      {
        id: 'hcpFilter',
        type: FilterType.SingleSelect,
        label: 'HCP',
        options: [
          {
            label: 'All',
            value: 0,
            selected: true
          },
          {
            label: 'First Available',
            value: 1,
            selected: false
          },
          {
            label: 'Mr GP, John',
            value: 2,
            selected: false
          },
          {
            label: 'Mr GP, Camila',
            value: 3,
            selected: false
          },
          {
            label: 'Mr GP, Peter',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Brian',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Simon',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Peter',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Matthew',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Jane',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Susan',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Brendan',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Laura',
            value: 4,
            selected: false
          },
          {
            label: 'Mr GP, Michelle',
            value: 4,
            selected: false
          }
        ],
        callback: [this.onFilterHandler, 'status']
      },
      {
        id: 'searchFilter',
        type: FilterType.Search,
        label: 'Filter by name',
        callback: [this.onSearchFilterHandler]
      }
    ];
  
    constructor() {}
  
    resetFilters() {
      this.filtersComponent.resetFilters();
    }
  
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  
    onFilterHandler(type, data) {
      console.log(type, data);
    }
  
    onSearchFilterHandler(term) {
      console.log(term);
    }
  
  }


    `;
}