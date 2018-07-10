import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import { DatepickerFormComponent } from './datepicker-form.component';
import {PositioningService} from '../positioning/positioning.service';


describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerFormComponent, DatepickerComponent ],
      providers: [PositioningService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("renderCalendar", () => {
    it('should populate component.days[] starting from the 1st of the month if the 1st is a Monday', () => {
      let date: Date = new Date("October 2018");
      component.viewDate = date;

      component.renderCalendar();

      expect(component.days[0].getDate()).toBe(date.getDate());
    });

    it('should populate component.days[] starting from the 1st of the month minus how many days of the week away from monday', () => {
      // Days of the week that the 1st of some month is on
      let Monday: Date = new Date("October 2018");
      let Tuesday: Date = new Date("May 2018");
      let Wednesday: Date = new Date("August 2018");
      let Thursday: Date = new Date("February 2018");
      let Friday: Date = new Date("June 2018");
      let Saturday: Date = new Date("September 2018");
      let Sunday: Date = new Date("April 2018");

      // Confirm that the first element in the days[] array is Monday, possibly from the previous month
      confirmRenderCalendarStartDate(Monday, new Date("Monday 01 October 2018"))
      confirmRenderCalendarStartDate(Tuesday, new Date("Monday 30 April 2018"))
      confirmRenderCalendarStartDate(Wednesday, new Date("Monday 30 July 2018"))
      confirmRenderCalendarStartDate(Thursday, new Date("Monday 29 January 2018"))
      confirmRenderCalendarStartDate(Friday, new Date("Monday 28 May 2018"))
      confirmRenderCalendarStartDate(Saturday, new Date("Monday 27 August 2018"))
      confirmRenderCalendarStartDate(Sunday, new Date("Monday 26 March 2018"))
    });

    function confirmRenderCalendarStartDate(month: Date, startDate: Date) {
      component.viewDate = month;

      component.renderCalendar();

      expect(component.days[0].getDate()).toBe(startDate.getDate());
    }
  });

  describe('previousMonth', () =>{
    it('should set component.viewDate to the previous month', () => {
      let previousMonth = new Date("June 2018");
      component.viewDate = new Date("July 2018");

      component.previousMonth();

      expect(component.viewDate.getMonth()).toBe(previousMonth.getMonth())
    });
  });

  describe('nextMonth', () =>{
    it('should set component.viewDate to the next month', () => {
      let nextMonth = new Date("July 2018");
      component.viewDate = new Date("June 2018");

      component.nextMonth();

      expect(component.viewDate.getMonth()).toBe(nextMonth.getMonth())
    });
  });
});