import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartjsHomeContainerComponent } from './chartjs-home-container.component'

describe('ChartjsHomeContainerComponent', () => {
  let component: ChartjsHomeContainerComponent
  let fixture: ComponentFixture<ChartjsHomeContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartjsHomeContainerComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsHomeContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
