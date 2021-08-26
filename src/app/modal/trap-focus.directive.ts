import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core'

@Directive({
  selector: '[trapFocus]'
})
export class TrapFocusDirective implements AfterViewInit, OnDestroy {

  @Input('trapFocus')
  component: any

  private keydownListener: any
  private focusoutListener: any

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.setupFocusTrap(this.el.nativeElement)
  }

  ngOnDestroy() {
    if (this.keydownListener)
      document.removeEventListener('keydown', this.keydownListener)
    if (this.focusoutListener)
      document.removeEventListener('focusout', this.focusoutListener)
  }

  setupFocusTrap(element: any) {
    const query = element.querySelectorAll('a[href], button, details, input, select, textarea')
    const focusable = Array.from(query).filter((el: any) => !el.disabled)
    const firstFocusable: any = focusable[0]
    const lastFocusable: any = focusable[focusable.length - 1]

    this.keydownListener = (ev: KeyboardEvent) => {
      const tabPressed = ev.code === 'Tab'
      if (!tabPressed)
        return
      if (ev.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus()
          ev.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus()
          ev.preventDefault()
        }
      }
    }
    document.addEventListener('keydown', this.keydownListener)

    this.focusoutListener = (ev: FocusEvent) => {
      if (!ev.relatedTarget) {
        document.addEventListener('focusin', (ev: FocusEvent) => {
          if (!ev.relatedTarget || !this.el.nativeElement.contains(ev.relatedTarget)) {
            ev.stopPropagation()
            this.component.defaultNode.nativeElement.focus()
          }
        }, { once: true, capture: true })
      }
    }
    document.addEventListener('focusout', this.focusoutListener)
  }
}
