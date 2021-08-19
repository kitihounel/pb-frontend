import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title   = ''
  content = [] as string[]
  active  = false

  private closeSubject = new Subject<boolean>()

  constructor() {}

  ngOnInit(): void {}

  open() {
    this.active = true
  }

  close(b: boolean) {
    this.active = false
    this.closeSubject.next(b)
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
