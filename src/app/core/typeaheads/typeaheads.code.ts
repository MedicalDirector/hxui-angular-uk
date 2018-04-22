export class TypeaheadsCode {

usage =
`
import {TypeaheadsModule} from "@hxui/angular";

@NgModule({
  imports: [TypeaheadsModule.forRoot(),...]
})
export class AppModule(){}

`;

exampleTemplate =
`

<div class="hx-input-control">
  <input class="hx-input" type="text" [(ngModel)]="selected"
    [typeahead]="states" required>
  <label class="hx-label"><i class="icon icon-search is-small"></i> Medications</label>
  <div class="hx-help">Search for medication names</div>
</div>

`;

exampleTypescript =
`
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typeaheads',
  templateUrl: './typeaheads.component.html'
})
export class TypeaheadsComponent implements OnInit {
  public selected: string;
  public states: string[] = [
    'SABRIL powder for oral solution 500mg',
    'SABRIL tablet 500mg',
    'SACROSIDASE oral liquid, solution 8,500 Units/mL',
    'SACUBITRIL/VALSARTAN tablet 24.3mg/25.7mg',
    'SACUBITRIL/VALSARTAN tablet 48.6mg/51.4mg',
    'SACUBITRIL/VALSARTAN tablet 97.3mg/102.8mg',
    'SAFLUTAN eye drops 0.0015% (4.5mcg/0.3mL)',
    'SAIZEN 8 CLICK.EASY powder for injection 8mg (24 units)',
    'SAIZEN powder for injection 3mg (10 units)',
    'SAIZEN injection 6mg (18 units)',
    'SAIZEN injection 12mg (36 units)',
    'SAIZEN injection 20mg (60 units)',
    'SALAZOPYRIN-EN enteric-coated tablet 500mg',
    'SALBUTAMOL ACTAVIS inhalation 2.5mg/2.5mL',
    'SALBUTAMOL ACTAVIS inhalation 5mg/2.5mL',
    'SALBUTAMOL SANDOZ inhalation 2.5mg/2.5mL',
    'SALBUTAMOL SANDOZ inhalation 5mg/2.5mL',
    'SALBUTAMOL metered-dose aerosol 100mcg/dose',
    'SALBUTAMOL injection 1mg/mL'];
  constructor() { }

  ngOnInit() {
  }

}

`;
}