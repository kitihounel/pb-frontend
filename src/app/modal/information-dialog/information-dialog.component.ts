import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent implements OnInit {

  @ViewChild('defaultNode', { static: true }) defaultNode!: ElementRef

  title   = ''
  content = [] as string[]
  active  = false

  private closeSubject = new Subject<unknown>()

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Enter')
      this.close()
  }

  open() {
    this.active = true
    this.defaultNode.nativeElement.focus()
  }

  close() {
    this.active = false
    this.closeSubject.next()
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
