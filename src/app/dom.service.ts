import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef
} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class DomService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  createComponent(component: any, componentProps?: object) {
    // 1. Create a component reference from the component 
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector)

    if (componentProps && typeof componentRef.instance === 'object')
      Object.assign(componentRef.instance as object, componentProps)

    return componentRef
  }

  attachComponent(componentRef: ComponentRef<unknown>, parent: Element) {
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView)

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement

    // 4. Append DOM element to the body
    parent.appendChild(domElem)

    return
  }

  removeComponent(componentRef: ComponentRef<unknown>) {
    // 5. Remove component from the component tree and from the DOM
    this.appRef.detachView(componentRef.hostView)
    componentRef.destroy()
  }
}
