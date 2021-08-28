import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage!: number
  @Input() maxPage!: number

  @Output() notify = new EventEmitter<number>()

  @ViewChild('input', { static: true }) input!: ElementRef

  constructor() {}

  ngOnInit(): void {}

  onFirst() {
    this.currentPage = 1
    this.emitChangeEvent()
  }

  onPrevious() {
    this.currentPage -= 1
    this.emitChangeEvent()
  }

  onNext() {
    this.currentPage += 1
    this.emitChangeEvent()
  }

  onLast() {
    this.currentPage = this.maxPage
    this.emitChangeEvent()
  }

  onInput($event: any) {
    const el = this.input.nativeElement as HTMLInputElement
    if (el.validity.valid) {
      const value = parseInt(el.value)
      if (!isNaN(value)) {
        this.currentPage = value
        this.emitChangeEvent()
      }
    }
  }

  private emitChangeEvent() {
    this.notify.emit(this.currentPage)
  }
}
