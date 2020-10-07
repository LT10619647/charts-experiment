import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartjsHomeComponent } from './chartjs-home.component'

describe('ChartjsHomeComponent', () => {
  let component: ChartjsHomeComponent
  let fixture: ComponentFixture<ChartjsHomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartjsHomeComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
