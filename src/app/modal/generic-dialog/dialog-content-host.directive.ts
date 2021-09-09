import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[contentHost]'
})
export class DialogContentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
