import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InformationDialogComponent } from './information-dialog/information-dialog.component'
import { ConfirmDialogComponent } from './confirm-dilaog/confirm-dialog.component'
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component'
import { FormsModule } from '@angular/forms'
import { TrapFocusDirective } from './trap-focus.directive'
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component'
import { DialogContentHostDirective } from './generic-dialog/dialog-content-host.directive'

@NgModule({
  declarations: [
    InformationDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
    TrapFocusDirective,
    GenericDialogComponent,
    DialogContentHostDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PromptDialogComponent]
})
export class ModalModule {
}
