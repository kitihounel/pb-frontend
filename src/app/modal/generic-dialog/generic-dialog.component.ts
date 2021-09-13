import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { DialogContent } from './dialog-content'
import { DialogContentHostDirective } from './dialog-content-host.directive'

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent implements OnInit {

  title = ''

  @ViewChild(DialogContentHostDirective, { static: true }) contentHost!: DialogContentHostDirective
  @ViewChild('defaultNode', { static: true }) defaultNode!: ElementRef
  @ViewChild('el', { static: true }) el!: ElementRef

  private content!: DialogContent

  private closeSubject = new Subject<boolean>()

  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loadComponent()
  }

  private loadComponent() {
    const componentFactory = this.resolver.resolveComponentFactory(this.content.component)

    const viewContainerRef = this.contentHost.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent<any>(componentFactory)
    componentRef.instance.data = this.content.data
  }

  close() {
    this.el.nativeElement.classList.remove('is-active')
    this.closeSubject.next(true)
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
