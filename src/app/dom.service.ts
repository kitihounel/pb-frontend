import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef
} from '@angular/core'

type InsertPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'

@Injectable({
  providedIn: 'root'
})
export class DomService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  createComponent(component: any, props?: object) {
    // 1. Create a component reference from the component 
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector)

    if (props && typeof componentRef.instance === 'object')
      Object.assign(componentRef.instance as object, props)

    return componentRef
  }

  attachComponent(componentRef: ComponentRef<unknown>, sibling: Element, position: InsertPosition) {
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView)

    // 3. Get DOM element from component
    const el = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement

    // 4. Append DOM element to specified position
    sibling.insertAdjacentElement(position, el)
  }

  removeComponent(componentRef: ComponentRef<unknown>) {
    // 5. Remove component from the component tree and from the DOM
    this.appRef.detachView(componentRef.hostView)
    componentRef.destroy()
  }
}
