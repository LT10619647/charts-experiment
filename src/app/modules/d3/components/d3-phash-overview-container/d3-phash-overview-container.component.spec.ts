import { ComponentFixture, TestBed } from '@angular/core/testing'

import { D3PhashOverviewContainerComponent } from './d3-phash-overview-container.component'

describe('D3PhashOverviewContainerComponent', () => {
  let component: D3PhashOverviewContainerComponent
  let fixture: ComponentFixture<D3PhashOverviewContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D3PhashOverviewContainerComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(D3PhashOverviewContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
