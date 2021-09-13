import { Component, OnInit, HostListener, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent implements OnInit {

  @ViewChild('el', { static: true }) el!: ElementRef
  @ViewChild('defaultNode', { static: true }) defaultNode!: ElementRef

  title   = ''
  content = [] as string[]
  text = ''

  private closeSubject = new Subject<{ accept: boolean, value: string }>()

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape')
      this.close(false)
    if (event.key === 'Enter')
      this.close(true)
  }

  close(b: boolean) {
    this.el.nativeElement.classList.remove('is-active')
    this.closeSubject.next({ accept: b, value: this.text.trim() })
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
