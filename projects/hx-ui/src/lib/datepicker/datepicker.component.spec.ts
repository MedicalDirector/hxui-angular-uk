import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Overlay } from '@angular/cdk/overlay';
import { ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PositioningService } from '../positioning/positioning.service';
import { TabsModule } from '../tabs/tabs.module';
import { TabsetConfig } from '../tabs/tabset.config';
import { DatepickerFormComponent } from './datepicker-form.component';
import { DatepickerIntervalComponent } from './datepicker-interval.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerConfig } from './datepicker.config';

@Injectable()
export class MockElementRef extends ElementRef {
  nativeElement = {
    getElementsByTagName: () => {
      return [];
    }
  };
  constructor(nativeElement) {
    super(nativeElement);
  }
}

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TabsModule, NgxMaskModule],
      declarations: [
        DatepickerFormComponent,
        DatepickerComponent,
        DatepickerIntervalComponent
      ],
      providers: [
        PositioningService,
        DatepickerConfig,
        TabsetConfig,
        DatepickerFormComponent,
        { provide: ElementRef, useValue: new MockElementRef(null) },
        ViewContainerRef,
        Overlay
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    component.validators = [() => true];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('renderCalendar', () => {
    it('should populate component.days[] starting from the 1st of the month if the 1st is a Monday', () => {
      const date: Date = new Date('October 2018');
      component.viewDate = date;

      component.renderCalendar();

      expect(component.days[0].getDate()).toBe(date.getDate());
    });

    it('should populate component.days[] starting from the 1st of the month minus how many days of the week away from monday', () => {
      // Days of the week that the 1st of some month is on
      const Monday: Date = new Date('October 2018');
      const Tuesday: Date = new Date('May 2018');
      const Wednesday: Date = new Date('August 2018');
      const Thursday: Date = new Date('February 2018');
      const Friday: Date = new Date('June 2018');
      const Saturday: Date = new Date('September 2018');
      const Sunday: Date = new Date('April 2018');

      // Confirm that the first element in the days[] array is Monday, possibly from the previous month
      confirmRenderCalendarStartDate(
        Monday,
        new Date('Monday 01 October 2018')
      );
      confirmRenderCalendarStartDate(Tuesday, new Date('Monday 30 April 2018'));
      confirmRenderCalendarStartDate(
        Wednesday,
        new Date('Monday 30 July 2018')
      );
      confirmRenderCalendarStartDate(
        Thursday,
        new Date('Monday 29 January 2018')
      );
      confirmRenderCalendarStartDate(Friday, new Date('Monday 28 May 2018'));
      confirmRenderCalendarStartDate(
        Saturday,
        new Date('Monday 27 August 2018')
      );
      confirmRenderCalendarStartDate(Sunday, new Date('Monday 26 March 2018'));
    });

    function confirmRenderCalendarStartDate(month: Date, startDate: Date) {
      component.viewDate = month;

      component.renderCalendar();

      expect(component.days[0].getDate()).toBe(startDate.getDate());
    }
  });

  describe('previousMonth', () => {
    it('should set component.viewDate to the previous month', () => {
      const previousMonth = new Date('June 2018');
      component.viewDate = new Date('July 2018');

      component.previousMonth();

      expect(component.viewDate.getMonth()).toBe(previousMonth.getMonth());
    });
  });

  describe('nextMonth', () => {
    it('should set component.viewDate to the next month', () => {
      const nextMonth = new Date('July 2018');
      component.viewDate = new Date('June 2018');

      component.nextMonth();

      expect(component.viewDate.getMonth()).toBe(nextMonth.getMonth());
    });
  });
});
