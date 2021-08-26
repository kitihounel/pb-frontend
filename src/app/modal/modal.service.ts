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

  createInfoDialog(title: string, content: string[]) {
    const compRef = this.domService.createComponent(InformationDialogComponent, { title, content })
    this.domService.attachComponent(compRef, document.body, 'beforeend')

    const comp = compRef.instance as InformationDialogComponent
    comp.afterClose().subscribe(() => this.domService.removeComponent(compRef))
    return comp
  }

  createConfirmDialog(title: string, content: string[]) {
    const compRef = this.domService.createComponent(ConfirmDialogComponent, { title, content })
    this.domService.attachComponent(compRef, document.body, 'beforeend')

    const comp = compRef.instance as ConfirmDialogComponent
    comp.afterClose().subscribe(() => this.domService.removeComponent(compRef))
    return comp
  }

  createPromptDialog(title: string, content: string[]) {
    const compRef = this.domService.createComponent(PromptDialogComponent, { title, content })
    this.domService.attachComponent(compRef, document.body, 'beforeend')

    const comp = compRef.instance as PromptDialogComponent
    comp.afterClose().subscribe(() => this.domService.removeComponent(compRef))
    return comp
  }
}
