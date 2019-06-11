## [7.0.42](https://www.npmjs.com/package/@hxui/angular/v/7.0.41) (2019-06-06)

### Bugfix

* **Tabular:** Fixed issue which caused change detection to not run  ([0f19207c34429d19a72255c6af1e3d73439c982a](https://bitbucket.org/md-design/angular-hxui/commits/0f19207c34429d19a72255c6af1e3d73439c982a))


## [7.0.41](https://www.npmjs.com/package/@hxui/angular/v/7.0.41) (2019-06-06)

### Bugfix

* **Datepicker:** Fixed issue with the onDateChange event which was triggering before ngModel was propegated and triggering multiple times on initialise  ([5c3e9f1896b05819caf2eaf49eec234316ccb86d](https://bitbucket.org/md-design/angular-hxui/commits/5c3e9f1896b05819caf2eaf49eec234316ccb86d))


## [7.0.40](https://www.npmjs.com/package/@hxui/angular/v/7.0.40) (2019-06-04)

### Enhancements

* **Filters:** Added an optional width property to search type filters  ([1e4bb5cfddbb3fae7ab436edf145f1fc303869a5](https://bitbucket.org/md-design/angular-hxui/commits/1e4bb5cfddbb3fae7ab436edf145f1fc303869a5))


## [7.0.39](https://www.npmjs.com/package/@hxui/angular/v/7.0.39) (2019-06-03)

### Bug Fix

* **Tabular:** Fixed issue with check all checkboxes running change detection multiple times  ([e8c7bad37075b18a7996246bf3e5d8e97ccfa401](https://bitbucket.org/md-design/angular-hxui/commits/e8c7bad37075b18a7996246bf3e5d8e97ccfa401))


## [7.0.38](https://www.npmjs.com/package/@hxui/angular/v/7.0.38) (2019-05-24)

### Bug Fix

* **Tabular:** Fixed issue with check all checkboxes not un-checking when all rowData items have been unselected via the external source  ([6a527d7ce4bc7e0cbc6e7234ad8b14e471028c56](https://bitbucket.org/md-design/angular-hxui/commits/6a527d7ce4bc7e0cbc6e7234ad8b14e471028c56))


## [7.0.37](https://www.npmjs.com/package/@hxui/angular/v/7.0.37) (2019-05-21)

### Enhancements

* **Selectize styling:** Selectize font and labels standardized to be consistent with css form styling. ([d701a5f3bd6a9a3f4eae51060f35a1a89227d4fd](https://bitbucket.org/md-design/angular-hxui/commits/d701a5f3bd6a9a3f4eae51060f35a1a89227d4fd))


## [7.0.36](https://www.npmjs.com/package/@hxui/angular/v/7.0.36) (2019-05-20)


### Enhancements

* **Tooltips:** Added support for projecting content into the tooltip content area via a tooltip dynamic content directive  ([fa6b11626b68b3a0183bc2b2a759edb273b4168f](https://bitbucket.org/md-design/angular-hxui/commits/fa6b11626b68b3a0183bc2b2a759edb273b4168f))
* **Tooltips:** Added autoClose input, which allows tooltips to remain open until user clicks anywhere outside of tooltip  ([fa6b11626b68b3a0183bc2b2a759edb273b4168f](https://bitbucket.org/md-design/angular-hxui/commits/fa6b11626b68b3a0183bc2b2a759edb273b4168f))

example:
```html
  <i class="hx-icon icon-information-outline" hxTooltip [autoClose]="false" placement="right">
     <div *hxaTooltipDynamicContent>
       <div class='is-text-left pa-3'>
         ENABLED FOR
         <ul>
           <li>Card payments</li>
           <li>Fully paid patient claims with EasyClaim</li>
           <li>Dynamic content with <a (click)="onClickHandler($event)">links</a></li>
         </ul>
       </div>
     </div>
   </i>
```

## [7.0.35](https://www.npmjs.com/package/@hxui/angular/v/7.0.35) (2019-05-14)


### Enhancements

* **Dropdowns:** Added the ability to set an x and/or y offset to set a dropdowns position. ([1b0137ddfbbf0bf413176be92fa1a7c95549480a](https://bitbucket.org/md-design/angular-hxui/commits/1b0137ddfbbf0bf413176be92fa1a7c95549480a))

example:
```html
 <div class="hx-dropdown" hxaDropdown [offsetX]="-20" [offsetY]="10">
          <button class="hx-button" hxDropdownToggle type="button">
            <span>Dropdown</span>
            <span class="hx-icon-control"><i class="icon icon-caret-down"></i></span>
          </button>
          <div class="hx-dropdown-menu" *hxaDropdownMenu>
              <div class="hx-dropdown-header">Dropdown header</div>
                <a class="hx-dropdown-item" hxaDropdownItem>Action</a>
                <a class="hx-dropdown-item" hxaDropdownItem>Another action</a>
                <div class="hx-dropdown-divider"></div>
                <a class="hx-dropdown-item" hxaDropdownItem>Action</a>
                <a class="hx-dropdown-item" hxaDropdownItem>Another action</a>
              </div>
            </div>
      </div>
```

## [7.0.34](https://www.npmjs.com/package/@hxui/angular/v/7.0.34) (2019-05-08)


### Features

* **Tabset:** Added background inheritance in tabset nav. ([a727168d75462d3883325007699380b4119fe7ee](https://bitbucket.org/md-design/angular-hxui/commits/a727168d75462d3883325007699380b4119fe7ee))
* **Tabset:** Added custom content class and sticky header features to tabset. ([a3ec14b6cf186f1a84cdeee47e7c7d0450f3a4e7](https://bitbucket.org/md-design/angular-hxui/commits/a3ec14b6cf186f1a84cdeee47e7c7d0450f3a4e7))

