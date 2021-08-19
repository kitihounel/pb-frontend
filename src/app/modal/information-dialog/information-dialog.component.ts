import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent implements OnInit {
  
  title   = ''
  content = [] as string[]
  active  = false

  private closeSubject = new Subject<unknown>()

  constructor() {}

  ngOnInit(): void {}

  open() {
    this.active = true
  }

  close() {
    this.active = false
    this.closeSubject.next()
  }

  afterClose() {
    return this.closeSubject.asObservable()
  }
}
