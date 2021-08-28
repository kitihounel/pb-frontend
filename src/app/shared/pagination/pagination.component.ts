import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() startPage!: number
  @Input() maxPage!: number

  page!: number

  @Output() notify = new EventEmitter<number>()

  @ViewChild('input', { static: true }) input!: ElementRef

  constructor() {}

  ngOnInit(): void {
    this.page = this.startPage
  }

  onFirst() {
    this.page = 1
    this.emitChangeEvent()
  }

  onPrevious() {
    this.page -= 1
    this.emitChangeEvent()
  }

  onNext() {
    this.page += 1
    this.emitChangeEvent()
  }

  onLast() {
    this.page = this.maxPage
    this.emitChangeEvent()
  }

  onInput() {
    const el = this.input.nativeElement as HTMLInputElement
    if (el.validity.valid) {
      const value = parseInt(el.value)
      if (!isNaN(value)) {
        this.page = value
        this.emitChangeEvent()
      }
    }
  }

  private emitChangeEvent() {
    this.notify.emit(this.page)
  }
}
