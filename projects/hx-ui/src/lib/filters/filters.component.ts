import {Component, DoCheck, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, ContentChildren, AfterContentInit, AfterContentChecked} from '@angular/core';
import {FilterType} from './filters-type.enum';
import {IFilterOption, IFiltersConfig} from './filters-config.interface';
import {FiltersModel} from './filters.model';
import * as _ from 'lodash';
import {BehaviorSubject, from, Observable, pipe, Subject, Subscription} from 'rxjs/index';
import {FiltersConfig} from './filters.config';
import {debounceTime} from 'rxjs/internal/operators';
import { DatePipe } from '@angular/common';
import {DateRangeInterface} from "../date-range-picker/date-range.interface";


@Component({
  selector: 'hxa-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, DoCheck, OnDestroy {

  @ViewChild('carousel') private carousel: ElementRef;
  @ViewChildren("dateRangePicker") dateRangePickers: QueryList<any>

  FilterType = FilterType;
  data: FiltersModel[] = [];
  onFilterOptionChanged$ = new Subject<FiltersModel>();
  searchFilter$: Subject<FiltersModel> = new Subject<FiltersModel>();
  subscriptions: Subscription = new Subscription();

  private _filters: IFiltersConfig[] = [];
  private _oldFilters: IFiltersConfig[] = [];
  private _collapsed = false;

  @Input()
  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(value: boolean) {
    this._collapsed = value;
  }

  @Input()
  get filters(): IFiltersConfig[] {
    return this._filters;
  }

  set filters(value: IFiltersConfig[]) {
    this._filters = value;
    this.setData();
  }

  constructor(
    private conf: FiltersConfig,
    private datePipe: DatePipe
  ) {
    Object.assign(this, conf);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.searchFilter$
        .pipe(debounceTime(this.conf.debounce))
        .subscribe((x) =>  this.onFilterOptionChanged$.next(x))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngDoCheck() {
    if (!_.isEqual(this._filters, this._oldFilters)) {
      this._oldFilters = _.cloneDeep(this._filters);
      this.setData();
    }
  }

   getIntervalOptions(options: IFilterOption[]) {
    let intervalOption: string[] = [];
    if(options){
    for(let i=0; i<options.length; i++){
      intervalOption.push(options[i].label);
    }
  }
  return intervalOption;
}

  resetFilters(silent: boolean = false) {
    for (const filter of this.data) {
      if (filter.type === FilterType.SingleSelect) {
        filter.setDefaultOption();
        if (!silent) {
          this.onFilterOptionChanged$.next(filter);
        }
      } else if (filter.type === FilterType.Search) {
        this.clearSearch(filter, silent);
      }
      else if (filter.type === FilterType.DateRange) {
        this.setDefaultDate(filter);
      }
    }
  }

  clearSearch(filter: FiltersModel, silent: boolean = false) {
      filter.value = '';
      if (!silent) {
        this.onFilterOptionChanged$.next(filter);
      }
  }

  setDefaultDate(filter: FiltersModel){
    filter.value = '';
    filter.sourceValue = undefined;
    if(!this._collapsed)
     {
        for(let i = 0 ; i < this.dateRangePickers.toArray().length; i++){
          this.dateRangePickers.toArray()[i].resetDateRange();
        }
     }
    this.onFilterOptionChanged$.next(filter);
  }

  /**
   * Called when filter option is selected
   */
  onFilterOptionSelected(filter: FiltersModel, option: IFilterOption) {
    filter.setSelectedOption(option);
    this.onFilterOptionChanged$.next(filter);
  }

  /**
   * Called when character is typed in the search filter type
   */
  onSearchFilterChange(filter: FiltersModel) {
    if (filter.value.length === 0 || filter.value.length >= filter.charLimit) {
      this.searchFilter$.next(filter);
    }
  }

  /**
   * Called when selection is made in the date range filter type
   */
  onDateRangeFilterChange(filter: FiltersModel, dateRange: DateRangeInterface){
    let dateRangeValue = this.datePipe.transform(dateRange.fromDate,filter.dateRangePickerDisplayDateFormat) + ' - '+ this.datePipe.transform(dateRange.toDate,filter.dateRangePickerDisplayDateFormat);
    filter.value = dateRangeValue;
    filter.sourceValue = dateRange;
    this.searchFilter$.next(filter);
  }

  onCollapsedFilter($event) {
   this.onFilterOptionSelected($event.filter,  $event.option);
  }

  onCollapsedSearch($event) {
    this.onSearchFilterChange($event.filter);
  }

  onCollapsedDateRangePicker($event){
    this.onDateRangeFilterChange($event.filter, $event.dateRange)
  }

  /**
   * Used for track by and boost performance
   */
  trackByFn(index, action) {
    return index;
  }

  /**
   * Convert filter config objects to Filter Models
   */
  setData() {
    this.data = [];
    if (this._filters) {
      this._filters.forEach((filter: IFiltersConfig, index) => {
        this.data.push(new FiltersModel(_.cloneDeep(filter)));
      });
    }
  }
}
