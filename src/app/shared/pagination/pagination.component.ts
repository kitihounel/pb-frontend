import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page!: number
  @Input() maxPage!: number

  @Output() pageChange = new EventEmitter<number>()
  @Output() maxPageChange = new EventEmitter<number>()

  @ViewChild('input', { static: true }) input!: ElementRef

  constructor() {}

  ngOnInit(): void {}

  onFirst() {
    this.page = 1
    this.emitPageChangeEvent()
  }

  onPrevious() {
    this.page -= 1
    this.emitPageChangeEvent()
  }

  onNext() {
    this.page += 1
    this.emitPageChangeEvent()
  }

  onLast() {
    this.page = this.maxPage
    this.emitPageChangeEvent()
  }

  onInput() {
    const el = this.input.nativeElement as HTMLInputElement
    if (!el.validity.valid)
      return
    const value = parseInt(el.value)
    if (isNaN(value)) {
      this.page = value
      this.emitPageChangeEvent()
    }
  }

  private emitPageChangeEvent() {
    this.pageChange.emit(this.page)
  }
}
