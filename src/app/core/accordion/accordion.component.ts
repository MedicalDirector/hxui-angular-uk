import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll';
import { CoreBaseComponent } from '../core-base.component';
import { AccordionCode } from './accordion.code';
import {BreakpointsService} from '../../../../projects/hx-ui/src/lib/utils/breakpoint.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class AccordionComponent extends CoreBaseComponent {

  public code = new AccordionCode();

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointsService: BreakpointsService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointsService, document);
  }
}
