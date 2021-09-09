import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { DialogContent } from './dialog-content'
import { DialogContentHostDirective } from './dialog-content-host.directive'

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent implements OnInit {

  active = false
  title = ''

  @ViewChild(DialogContentHostDirective, { static: true })
  contentHost!: DialogContentHostDirective

  private closeSubject = new Subject<boolean>()

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  loadComponent(content: DialogContent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content.component)

    const viewContainerRef = this.contentHost.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent<any>(componentFactory)
    componentRef.instance.data = content.data
  }

  open() {
    this.active = true
  }

  close() {
    this.active = false
    this.closeSubject.next(true)
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
