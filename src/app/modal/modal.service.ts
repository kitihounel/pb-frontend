import { Injectable } from '@angular/core'
import { DomService } from '../dom.service'
import { ConfirmDialogComponent } from './confirm-dilaog/confirm-dialog.component'
import { InformationDialogComponent } from './information-dialog/information-dialog.component'
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private domService: DomService) {}

  showInfo(title: string, content: string[], onClose?: () => any) {
    const compRef = this.domService.createComponent(InformationDialogComponent, { title, content })
    this.domService.attachComponent(compRef, document.body)

    const comp = compRef.instance as InformationDialogComponent
    comp.afterClose().subscribe(() => {
      this.domService.removeComponent(compRef)
      onClose?.()
    })
    comp.open()
  }

  showConfirm(title: string, content: string[], onClose?: (b: boolean) => any) {
    const compRef = this.domService.createComponent(ConfirmDialogComponent, { title, content })
    this.domService.attachComponent(compRef, document.body)

    const comp = compRef.instance as ConfirmDialogComponent
    comp.afterClose().subscribe((value) => {
      this.domService.removeComponent(compRef)
      onClose?.(value)
    })
    comp.open()
  }

  showPrompt(title: string, content: string[], onClose?: (data: any) => any) {
    const compRef = this.domService.createComponent(PromptDialogComponent, { title, content })
    this.domService.attachComponent(compRef, document.body)

    const comp = compRef.instance as PromptDialogComponent
    comp.afterClose().subscribe((value) => {
      this.domService.removeComponent(compRef)
      onClose?.(value)
    })
    comp.open()
  }
}
