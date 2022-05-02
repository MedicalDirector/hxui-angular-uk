import { DatepickerIntervalComponent } from './datepicker-interval.component';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Visibility } from '../enums';
import { DatepickerConfig } from './datepicker.config';
import { DatepickerViewModeEnum } from './datepicker-view-mode-enum';

@Component({
  selector: 'hxa-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnChanges {
  viewMode$ = new BehaviorSubject<DatepickerViewModeEnum>(
    DatepickerViewModeEnum.Days
  );
  DatepickerViewModeEnum = DatepickerViewModeEnum;
  public OpenDiv: Boolean = true;
  public showCalendar: Boolean = true;
  public tabname1: String;
  public activeVariable: Boolean = true;
  public activeVariable1: Boolean;

  @Input()
  selectedDate: Date;

  @Input()
  validators: Array<(date: Date) => boolean>;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Input()
  allowInterval = false;

  @Input()
  selectedDueDateInterval = '0 day(s)';

  onDateSelected: (inputDate: Date) => void;
  visibilityEnum = Visibility;
  visibility: Visibility = Visibility.Hidden;
  viewDate: Date;
  days: Array<Date> = new Array<Date>();
  week: Array<string> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  months: Array<string> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  years: Array<number> = new Array<number>();
  private presentDate: Date;
  private cellCount = 41;
  private yearCellCount = 20;
  private _dp: DatepickerIntervalComponent | null;
  /** Subject for notifying that the calendar has been hidden from the view */
  private readonly _onHide: Subject<any> = new Subject();

  /** The timeout ID of any current timer set to show the calendar */
  private _showTimeoutId: number;

  /** The timeout ID of any current timer set to hide the calendar */
  private _hideTimeoutId: number;

  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
    private datePickerConfig: DatepickerConfig
  ) {}

  // Populates the days array with the current month, and completes the view with partial dates from sibling months
  public renderCalendar(): void {
    for (let i = 0; i <= this.cellCount; i++) {
      // date will be set to the first day of the month set in this.viewDate
      const date: Date = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth()
      );
      // Shifts the week to start from Monday, rather than Sunday, this causes the index to start at 1
      const dayOffset = date.getDay() === 0 ? 7 : date.getDay();
      this.days[i] = new Date(date.setDate(2 - dayOffset + i));
      this.datePickerConfig.selectedDueDateConfiguration.selectedDueDate = this.days[
        i
      ];
    }
  }

  public next() {
    if (this.viewMode$.value === DatepickerViewModeEnum.Days) {
      this.nextMonth();
    } else if (this.viewMode$.value === DatepickerViewModeEnum.Years) {
      this.nextYear();
    }
  }

  public previous() {
    if (this.viewMode$.value === DatepickerViewModeEnum.Days) {
      this.previousMonth();
    } else if (this.viewMode$.value === DatepickerViewModeEnum.Years) {
      this.previousYear();
    }
  }

  public previousMonth(): void {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() - 1
    );
    this.renderCalendar();
  }

  public nextMonth(): void {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() + 1
    );
    this.renderCalendar();
  }

  public isCurrentMonth(inputDate: Date): boolean {
    return inputDate.getMonth() === this.viewDate.getMonth();
  }

  public isCurrentDay(inputDate: Date): boolean {
    return inputDate.getTime() === this.presentDate.getTime();
  }

  public isSelectedDay(inputDate: Date): boolean {
    if (this.selectedDate) {
      return inputDate.getTime() === this.selectedDate.getTime();
    }

    return false;
  }

  public isInvalidDay(inputDate: Date): boolean {
    return this.validators
      .map(fn => fn(inputDate))
      .reduce((prev, next) => prev || next, false);
  }

  public isCurrentYear(year: number): boolean {
    return year === this.presentDate.getFullYear();
  }

  public isSelectedYear(year: number): boolean {
    return year === this.viewDate.getFullYear();
  }

  public isInvalidYear(year: number): boolean {
    const newDate = new Date(
      new Date(this.viewDate.getTime()).setFullYear(year)
    );
    return this.validators
      .map(fn => fn(newDate))
      .reduce((prev, next) => prev || next, false);
  }

  isCurrentMonthByIndex(month: number): boolean {
    return month === this.presentDate.getMonth();
  }

  public isSelectedMonthByIndex(month: number): boolean {
    return month === this.viewDate.getMonth();
  }

  public isInvalidMonthByIndex(month: number): boolean {
    const newDate = new Date(new Date(this.viewDate.getTime()).setMonth(month));
    return this.validators
      .map(fn => fn(newDate))
      .reduce((prev, next) => prev || next, false);
  }

  public previousYear(): void {
    this.getYearCollection(this.years[0] - this.yearCellCount);
  }

  public nextYear(): void {
    this.getYearCollection(this.years[0] + this.yearCellCount);
  }

  public setYear(year) {
    if (!this.isInvalidYear(year)) {
      this.viewDate.setFullYear(year);
      this.renderCalendar();
      this.toggleYear();
    }
  }

  public setMonth(month) {
    if (!this.isInvalidMonthByIndex(month)) {
      this.viewDate.setMonth(month);
      this.renderCalendar();
      this.viewMode$.next(DatepickerViewModeEnum.Days);
    }
  }

  public setSelectedDate(date: Date): void {
    if (!this.isInvalidDay(date)) {
      this.selectedDate = date;
      this.onDateSelected(date);
      this.datePickerConfig.selectedDueDateConfiguration.isSelectedFromInterval = false;
    }
  }

  toggleYear() {
    this.viewMode$.next(
      this.viewMode$.value === DatepickerViewModeEnum.Years
        ? DatepickerViewModeEnum.Months
        : DatepickerViewModeEnum.Years
    );
    if (this.viewMode$.value === DatepickerViewModeEnum.Years) {
      this.getYearCollection();
    }
  }

  private getYearCollection(startFrom = null) {
    const yearsBeforeActive = 7;
    const activeYear = startFrom
      ? startFrom
      : this.viewDate.getFullYear() - yearsBeforeActive;
    this.years = [];
    for (let i = 0; i < this.yearCellCount; i++) {
      this.years.push(activeYear + i);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.selectedDate.currentValue) {
      this.viewDate = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth()
      );
    }
  }

  ngOnInit(): void {
    const date: Date = this.selectedDate ? this.selectedDate : new Date();
    this.presentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    this.viewDate =
      this.viewDate || new Date(date.getFullYear(), date.getMonth());
    this.renderCalendar();
    if (this.datePickerConfig.tabSelected === 'tab1') {
      this.activeVariable1 = false;
      this.activeVariable = true;
    }
    if (this.datePickerConfig.tabSelected === 'tab2') {
      this.activeVariable1 = true;
      this.activeVariable = false;
    }
  }

  /**
   * Shows the tooltip
   * @param delay Amount of milliseconds to the delay showing the tooltip.
   */
  show(delay: number): void {
    // Cancel the delayed hide if it is scheduled
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = window.setTimeout(() => {
      // Schedule for change detection incase the tooltip is used within a
      // component with OnPush change detection
      this._changeDetectionRef.markForCheck();
      this.visibility = Visibility.Visible;
    }, delay);

    if (this.allowInterval) {
      this.OpenDiv = true;
      this.showCalendar = false;
    } else {
      this.OpenDiv = false;
      this.showCalendar = true;
    }
  }

  /**
   * Hide the tooltip after the provided delay in ms.
   * @param delay Amount of milliseconds to delay hiding the tooltip.
   */
  hide(delay: number): void {
    // Cancel the delayed show if it is scheduled
    if (this._showTimeoutId) {
      clearTimeout(this._showTimeoutId);
    }

    this._hideTimeoutId = window.setTimeout(() => {
      this.visibility = Visibility.Hidden;
      this._onHide.next();
    }, delay);
  }

  /** Returns an observable that notifies when the tooltip has been hidden from view. */
  afterHidden(): Observable<void> {
    return this._onHide.asObservable();
  }

  isVisible(): boolean {
    return this.visibility === Visibility.Visible;
  }
  onTabSelect(tabname: String) {
    if (tabname === 'tab1') {
      this.datePickerConfig.tabSelected = tabname;
    } else {
      this.datePickerConfig.tabSelected = tabname;
    }
  }
}
