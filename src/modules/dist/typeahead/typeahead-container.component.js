import { Component, ElementRef, TemplateRef, ViewEncapsulation, HostListener } from '@angular/core';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';
import { latinize } from './typeahead-utils';
var TypeaheadContainerComponent = /** @class */ (function () {
    function TypeaheadContainerComponent(element) {
        this.isFocused = false;
        this._matches = [];
        this.element = element;
    }
    Object.defineProperty(TypeaheadContainerComponent.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        set: function (value) {
            this._matches = value;
            if (this._matches.length > 0) {
                this._active = this._matches[0];
                if (this._active.isHeader()) {
                    this.nextActiveMatch();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "optionsListTemplate", {
        get: function () {
            return this.parent ? this.parent.optionsListTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "itemTemplate", {
        get: function () {
            return this.parent ? this.parent.typeaheadItemTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadContainerComponent.prototype.selectActiveMatch = function () {
        this.selectMatch(this._active);
    };
    TypeaheadContainerComponent.prototype.prevActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index - 1 < 0
            ? this.matches.length - 1
            : index - 1];
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
    };
    TypeaheadContainerComponent.prototype.nextActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1
            ? 0
            : index + 1];
        if (this._active.isHeader()) {
            this.nextActiveMatch();
        }
    };
    TypeaheadContainerComponent.prototype.selectActive = function (value) {
        this.isFocused = true;
        this._active = value;
    };
    TypeaheadContainerComponent.prototype.hightlight = function (match, query) {
        var itemStr = match.value;
        var itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        var startIdx;
        var tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            var queryLen = query.length;
            for (var i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
                    itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
            }
        }
        return itemStr;
    };
    TypeaheadContainerComponent.prototype.focusLost = function () {
        this.isFocused = false;
    };
    TypeaheadContainerComponent.prototype.isActive = function (value) {
        return this._active === value;
    };
    TypeaheadContainerComponent.prototype.selectMatch = function (value, e) {
        var _this = this;
        if (e === void 0) { e = void 0; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout(function () {
            return _this.parent.typeaheadOnSelect.emit(value);
        }, 0);
        return false;
    };
    TypeaheadContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hx-typeahead-container',
                    // tslint:disable-next-line
                    template: "\n<!-- inject options list template -->\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || optionListTemplate\"\n  [ngTemplateOutletContext]=\"{matches:matches, itemTemplate:itemTemplate, query:query}\"></ng-template>\n\n<!-- default options item template -->\n<ng-template #hxItemTemplate let-match=\"match\" let-query=\"query\"><span [innerHtml]=\"hightlight(match, query)\"></span></ng-template>\n\n<!-- options list template -->\n<ng-template #optionListTemplate >\n<ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n   <h6 *ngIf=\"match.isHeader()\" class=\"hx-dropdown-header\">{{match}}</h6>\n   \n   <ng-template [ngIf]=\"!match.isHeader()\">\n      <a href=\"#\"\n        class=\"hx-dropdown-item\"\n        (click)=\"selectMatch(match, $event)\"\n        (mouseenter)=\"selectActive(match)\"\n        [class.active]=\"isActive(match)\">\n          <ng-template [ngTemplateOutlet]=\"itemTemplate || hxItemTemplate\" \n            [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template>\n      </a>\n  </ng-template>\n</ng-template>\n</ng-template>\n",
                    // tslint:disable
                    host: {
                        'class': 'hx-dropdown is-open hx-dropdown-menu',
                        style: 'position: absolute;display: block;'
                    },
                    // tslint: enable
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    TypeaheadContainerComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    TypeaheadContainerComponent.propDecorators = {
        "focusLost": [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['blur',] },],
    };
    return TypeaheadContainerComponent;
}());
export { TypeaheadContainerComponent };
//# sourceMappingURL=typeahead-container.component.js.map