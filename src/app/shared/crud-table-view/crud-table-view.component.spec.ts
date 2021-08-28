import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CrudTableViewComponent } from './crud-table-view.component'

describe('CrudTableViewComponent', () => {
  let component: CrudTableViewComponent
  let fixture: ComponentFixture<CrudTableViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudTableViewComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTableViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
