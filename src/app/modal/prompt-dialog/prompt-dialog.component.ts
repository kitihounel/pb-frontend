import { Component, OnInit, HostListener } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent implements OnInit {

  title   = ''
  content = [] as string[]
  active  = false
  input = ''

  private closeSubject = new Subject<unknown>()

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter')
      this.close(true)
    if (event.key === 'Escape')
      this.close(false)
  }

  open() {
    this.active = true
  }

  close(b: boolean) {
    this.active = false
    this.closeSubject.next({ accept: b, value: this.input.trim() })
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
