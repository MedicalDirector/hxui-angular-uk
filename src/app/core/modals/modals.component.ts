import {Component, Inject, OnInit} from '@angular/core';
import {ModalService} from '../../../modules/modal/modal.service';
import {CustomModalComponent} from './custom-modal/custom-modal.component';
import {PageScrollService} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';
import {CoreBaseComponent} from '../core-base.component';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class ModalsComponent extends CoreBaseComponent implements OnInit {

  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any,
              private modalService: ModalService) {
    super(pageScrollService, document);
  }

  ngOnInit() {
  }

  openModal = () => {
    this.modalService.create<CustomModalComponent>(CustomModalComponent, {
      onSuccess: (data) => {
        alert(data);
      },
      onCancelled: (data) => {
        alert(data);
      }
    });
  }

}
