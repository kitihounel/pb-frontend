import { Injectable } from '@angular/core'
import { DomService } from '../dom.service'

import { ConfirmDialogComponent } from './confirm-dilaog/confirm-dialog.component'
import { DialogContent } from './generic-dialog/dialog-content'
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component'
import { InformationDialogComponent } from './information-dialog/information-dialog.component'
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private domService: DomService) {}

  createInfoDialog(title: string, content: string[]) {
    const compRef = this.domService.createComponent(InformationDialogComponent, { title, content })
    const dialog = compRef.instance as InformationDialogComponent
    const closed = dialog.afterClose()
    closed.subscribe(() => this.domService.removeComponent(compRef))

    return {
      closed,
      open: () => {
        this.domService.attachComponent(compRef, document.body, 'beforeend')
        dialog.defaultNode.nativeElement.focus()
      }
    }
  }

  createConfirmDialog(title: string, content: string[]) {
    const compRef = this.domService.createComponent(ConfirmDialogComponent, { title, content })
    const dialog = compRef.instance as ConfirmDialogComponent
    const closed = dialog.afterClose()
    closed.subscribe(() => this.domService.removeComponent(compRef))

    return {
      closed,
      open: () => {
        this.domService.attachComponent(compRef, document.body, 'beforeend')
        dialog.defaultNode.nativeElement.focus()
      }
    }
  }

  createPromptDialog(title: string, content: string[]) {
    const compRef = this.domService.createComponent(PromptDialogComponent, { title, content })
    const dialog = compRef.instance as PromptDialogComponent
    const closed = dialog.afterClose()
    closed.subscribe(() => this.domService.removeComponent(compRef))

    return {
      closed,
      open: () => {
        this.domService.attachComponent(compRef, document.body, 'beforeend')
        dialog.defaultNode.nativeElement.focus()
      }
    }
  }

  createGenericDialog(title: string, content: DialogContent) {
    const compRef = this.domService.createComponent(GenericDialogComponent, { title, content })
    const dialog = compRef.instance as GenericDialogComponent
    const closed = dialog.afterClose()
    closed.subscribe(() => this.domService.removeComponent(compRef))

    return {
      closed,
      open: () => {
        this.domService.attachComponent(compRef, document.body, 'beforeend')
        dialog.defaultNode.nativeElement.focus()
      }
    }
  }
}
