import { NgModule, ModuleWithProviders } from '@angular/core';
import {ModalService} from './modal.service';
import {ModalPlaceholderComponent} from './modal-placeholder.component';
import {ModalBackdropComponent} from './modal-backdrop.component';

@NgModule({
    declarations: [ModalPlaceholderComponent, ModalBackdropComponent],
    exports: [ModalPlaceholderComponent]
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders<ModalModule> {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        };
    }
}

