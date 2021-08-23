import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core'

@Directive({
  selector: '[trapFocus]'
})
export class TrapFocusDirective implements AfterViewInit, OnDestroy {

  private keydownListener: any
  private focusoutListener: any

  constructor(private el: ElementRef) {}
  
  ngAfterViewInit() {
    this.trapFocus(this.el.nativeElement)
  }

  ngOnDestroy() {
    if (this.keydownListener)
      document.removeEventListener('keydown', this.keydownListener)
    if (this.focusoutListener)
      document.body.removeEventListener('focusout', this.focusoutListener)
  }

  trapFocus(element: any) {
    const query = element.querySelectorAll('a[href], button, details, input, select, textarea')
    const focusable = Array.from(query).filter((el: any) => !el.disabled)
    const firstFocusable: any = focusable[0]
    const lastFocusable: any = focusable[focusable.length - 1]
    
    this.keydownListener = (e: KeyboardEvent) => {
      const tabPressed = e.code === 'Tab'
      if (!tabPressed)
        return
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus()
          e.preventDefault()
        }
      }
    }
    document.addEventListener('keydown', this.keydownListener)

    this.focusoutListener = (ev: FocusEvent) => {
      if (!ev.relatedTarget) {
        document.addEventListener('focusin', (ev: FocusEvent) => {
          if (!ev.relatedTarget || !this.el.nativeElement.contains(ev.relatedTarget))
            this.el.nativeElement.querySelector('.js-default-focus').focus()
        }, { once: true })
      }
    }
    this.el.nativeElement.addEventListener('focusout', this.focusoutListener)
  }
}
