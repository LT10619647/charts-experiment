import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartjsShellComponent } from './chartjs-shell.component'

describe('ChartjsShellComponent', () => {
  let component: ChartjsShellComponent
  let fixture: ComponentFixture<ChartjsShellComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartjsShellComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsShellComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
