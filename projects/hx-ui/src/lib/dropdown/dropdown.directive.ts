import {
  Directive, ElementRef, EmbeddedViewRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output,
  Renderer2, ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { DropdownConfig } from './dropdown.config';
import { DropdownContainerComponent } from './dropdown-container.component';
import { DropdownState } from './dropdown.state';
import { HxComponentRef } from '../component-loader/hx-component-ref.class';
import { DropdownMenuDirective } from './dropdown-menu.directive';

@Directive({
  selector: '[hxDropdown],[dropdown]',
  exportAs: 'hx-dropdown',
  providers: [DropdownState],
  host: {
    '[class.is-dropup]': 'dropup',
    '[class.is-open]': 'isOpen',
    '[class.is-right]': 'isRight'
  }
})
export class DropdownDirective implements OnInit, OnDestroy {
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  @Input() placement: string;
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() triggers: string;
  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  @Input() container: string;

  /**
   * This attribute indicates that the dropdown should be opened upwards
   */
  @Input() dropup: boolean;

  /**
   * Indicates that dropdown will be closed on item or document click,
   * and after pressing ESC
   */
  @Input() set autoClose(value: boolean) {
    if (typeof value === 'boolean') {
      this._state.autoClose = value;
    }
  };

  get autoClose(): boolean {
    return this._state.autoClose;
  }

  /**
   * Disables dropdown toggle and hides dropdown menu if opened
   */
  @Input() set isDisabled(value: boolean) {
    this._isDisabled = value;
    this._state.isDisabledChange.emit(value);
    if (value) {
      this.hide();
    }
  }

  get isDisabled(): boolean { return this._isDisabled; }

  /**
   * Returns whether or not dropdown is position right of the toggle
   */
  @Input() get isRight(): boolean {
    return this._isInlineRight;
  }

  set isRight(value: boolean) {
    this._isInlineRight = value;
  }

  /**
   * Returns whether or not the dropdown is currently being shown
   */
  @Input() get isOpen(): boolean {
    if (this._showInline) {
      return this._isInlineOpen;
    }
    return this._dropdown.isShown;
  }

  set isOpen(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Emits an event when isOpen change
   */
  @Output() isOpenChange: EventEmitter<any>;

  /**
   * Emits an event when the popover is shown
   */
  @Output() onShown: EventEmitter<any>;

  /**
   * Emits an event when the popover is hidden
   */
  @Output() onHidden: EventEmitter<any>;

  // todo: move to component loader
  private _isInlineOpen = false;
  private _isInlineRight = false;
  private _showInline: boolean;
  private _inlinedMenu: EmbeddedViewRef<DropdownMenuDirective>;

  private _isDisabled: boolean;
  private _dropdown: ComponentLoader<DropdownContainerComponent>;
  private _subscriptions: Subscription[] = [];
  private _isInited = false;

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2,
              private _viewContainerRef: ViewContainerRef,
              private _cis: ComponentLoaderFactory,
              private _config: DropdownConfig,
              private _state: DropdownState) {
    // create dropdown component loader
    this._dropdown = this._cis
      .createLoader<DropdownContainerComponent>(this._elementRef, this._viewContainerRef, this._renderer)
      .provide({ provide: DropdownState, useValue: this._state });

    this.onShown = this._dropdown.onShown;
    this.onHidden = this._dropdown.onHidden;
    this.isOpenChange = this._state.isOpenChange;

    // set initial dropdown state from config
    this._state.autoClose = this._config.autoClose;
  }

  ngOnInit(): void {
    // fix: seems there are an issue with `routerLinkActive`
    // which result in duplicated call ngOnInit without call to ngOnDestroy
    // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
    if (this._isInited) { return; }
    this._isInited = true;

    this._showInline = !this.container;

    // attach DOM listeners
    this._dropdown.listen({
      triggers: this.triggers,
      show: () => this.show()
    });

    // toggle visibility on toggle element click
    this._subscriptions.push(this._state
      .toggleClick.subscribe((value: boolean) => this.toggle(value)));

    // hide dropdown if set disabled while opened
    this._subscriptions.push(this._state
      .isDisabledChange.pipe(
        filter((value: boolean) => value === true)
      ).subscribe((value: boolean) => this.hide()));

    // attach dropdown menu inside of dropdown
    if (this._showInline) {
      this._state.dropdownMenu
        .then((dropdownMenu: HxComponentRef<DropdownMenuDirective>) => {
          this._inlinedMenu = dropdownMenu.viewContainer.createEmbeddedView(dropdownMenu.templateRef);
        });
    }
  }

  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  show(): void {
    if (this.isOpen || this.isDisabled) {
      return;
    }

    if (this._showInline) {
      this._isInlineOpen = true;
      this.onShown.emit(true);
      this._state.isOpenChange.emit(true);
      return;
    }
    this._state.dropdownMenu
      .then((dropdownMenu) => {
        // check direction in which dropdown should be opened
        const _dropup = this.dropup === true ||
          (typeof this.dropup !== 'undefined' && this.dropup !== false);
        this._state.direction = _dropup ? 'up' : 'down';
        const _placement = this.placement ||
          (_dropup ? 'top left' : 'bottom left');

        // show dropdown
        this._dropdown
          .attach(DropdownContainerComponent)
          .to(this.container)
          .position({ attachment: _placement })
          .show({
            content: dropdownMenu.templateRef,
            placement: _placement
          });

        this._state.isOpenChange.emit(true);
      });

  }

  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  hide(): void {
    if (!this.isOpen) {
      return;
    }

    if (this._showInline) {
      this._isInlineOpen = false;
      this.onHidden.emit(true);
    } else {
      this._dropdown.hide();
    }

    this._state.isOpenChange.emit(false);
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  toggle(value?: boolean): void {
    if (this.isOpen || value === false) {
      return this.hide();
    }

    return this.show();
  }

  ngOnDestroy(): void {
    // clean up subscriptions and destroy dropdown
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
    this._dropdown.dispose();
  }
}