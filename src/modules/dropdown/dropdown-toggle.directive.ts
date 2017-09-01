import {
  Directive, ElementRef, HostBinding, HostListener, OnDestroy, Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DropdownState } from './dropdown.state';

@Directive({
  selector: '[hxDropdownToggle],[dropdownToggle]',
  exportAs: 'hx-dropdown-toggle'
})
export class DropdownToggleDirective implements OnDestroy {
  @HostBinding('attr.disabled')
  isDisabled: boolean = null;

  @HostBinding('class.is-active')
  @HostBinding('attr.aria-expanded') isOpen: boolean;

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    event.stopPropagation();
    if (this.isDisabled) {
      return;
    }

    // console.log(this._state.isOpen);
    if (!this._state.isOpen) {
     // console.log('click to open');
      this._state.toggleClick.emit();
    }

    if (this._state.isOpen || this._element.nativeElement.contains(event.target)) {
      const removeRegisteredListener = this._renderer.listen('document', 'click', () => {
      //  console.log('the document was clicked', this._state.isOpen);
        this._state.toggleClick.emit(false);
        removeRegisteredListener();
      });

    }
  }

  // Performance issue with multiple document listeners
  /*@HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    if (this._state.autoClose && event.button !== 2 &&
      !this._element.nativeElement.contains(event.target)) {
      console.log('document:click');
      this._state.toggleClick.emit(false);
    }
  }*/

  @HostListener('keyup.esc')
  onEsc(): void {
    if (this._state.autoClose) {
      this._state.toggleClick.emit(false);
    }
  }

  private _subscriptions: Subscription[] = [];

  constructor(private _state: DropdownState,
              private _element: ElementRef,
              private _renderer: Renderer2) {
    // sync is open value with state
    this._subscriptions.push(this._state
      .isOpenChange.subscribe((value: boolean) => this.isOpen = value));
    // populate disabled state
    this._subscriptions.push(this._state
      .isDisabledChange
      .subscribe((value: boolean) => this.isDisabled = value || null));
  }

  ngOnDestroy(): void {
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
}
