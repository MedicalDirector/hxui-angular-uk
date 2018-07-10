import { ModuleWithProviders, NgModule } from '@angular/core';

import { PositioningService } from '../positioning/positioning.service';
import { DropdownContainerComponent } from './dropdown-container.component';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownConfig } from './dropdown.config';

import { DropdownDirective } from './dropdown.directive';
import { DropdownState } from './dropdown.state';

@NgModule({
  declarations: [
    DropdownMenuDirective,
    DropdownToggleDirective,
    DropdownContainerComponent,
    DropdownDirective
  ],
  exports: [
    DropdownMenuDirective,
    DropdownToggleDirective,
    DropdownDirective
  ],
  entryComponents: [DropdownContainerComponent]
})
export class DropdownModule {
  public static forRoot(config?: any): ModuleWithProviders {
    return {
      ngModule: DropdownModule, providers: [
        PositioningService,
        DropdownState,
        {provide: DropdownConfig, useValue: config ? config : {autoClose: true}}
      ]
    };
  };

}