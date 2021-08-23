import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent implements OnInit {

  @ViewChild('el', { static: true }) el!: ElementRef
  @ViewChild('input', { static: true }) input!: ElementRef

  title   = ''
  content = [] as string[]
  active  = false
  text = ''

  private closeSubject = new Subject<unknown>()

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape')
      this.close(false)
    if (event.key === 'Enter')
      this.close(true)
  }

  open() {
    this.active = true
    this.input.nativeElement.focus()
  }

  close(b: boolean) {
    this.active = false
    this.closeSubject.next({ accept: b, value: this.text.trim() })
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
