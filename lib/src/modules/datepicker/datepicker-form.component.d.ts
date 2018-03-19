import { OnInit, ElementRef, EventEmitter, DoCheck } from '@angular/core';
import { DateValueAccessor } from './datevalue.accessor';
export declare class DatepickerFormComponent extends DateValueAccessor implements OnInit, DoCheck {
    private element;
    onDateChange: EventEmitter<Date>;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    allowTextEntry: boolean;
    defaultToPresentDate: boolean;
    allowPreviousDates: boolean;
    dateFormat: string;
    placeholder: string;
    align: "top" | "bottom";
    date: Date;
    visible: boolean;
    presentDate: Date;
    isValid: boolean;
    private hasInitialised;
    private validators;
    constructor(element: ElementRef);
    setDate(date: Date): void;
    setVisible(): void;
    unsetVisible(): void;
    onClickOutsideComponent(targetElement: HTMLElement): void;
    onDateSelectEvent(inputDate: Date): void;
    onChange(inputDate: string): void;
    onFocus(): void;
    onTab(inputDate: string): void;
    parseDate(inputDate: string): Date;
    validate(date: Date): boolean;
    registerValidator(fn: (date: Date) => boolean): void;
    validateIsNotBeforeDate(presentDate: Date): (date: Date) => boolean;
    validateIsNotNullOrUndefined(date: Date): boolean;
    ngDoCheck(): void;
    ngOnInit(): void;
}
