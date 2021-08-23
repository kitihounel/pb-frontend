import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @ViewChild('acceptBtn', { static: true }) acceptBtn!: ElementRef

  title   = ''
  content = [] as string[]
  active  = false

  private closeSubject = new Subject<boolean>()

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
    this.acceptBtn.nativeElement.focus()
  }

  close(b: boolean) {
    this.active = false
    this.closeSubject.next(b)
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
